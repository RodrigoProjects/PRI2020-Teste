var express = require('express');
var router = express.Router();
const Casamento = require("../controllers/Casamento")

router.get('/casamentos/noivos', function(req, res, next) {

    Casamento.list({}, {title:1, _id: 0})
        .then(dados => {
            res.jsonp(dados.map(tit => {
                return tit.title = tit.title.split(':')[1].split('c.c.')[0].trim()
            }))
        })
        .catch(e => {
            res.status(500).jsonp({error: e})
        })
});

/* GET home page. */
router.get('/casamentos', function(req, res, next) {

    if(req.query.nome){

        Casamento.list({title: {$regex : req.query.nome}}, { href:0})
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(e => {
            res.sendStatus(500)
        })
    } 
    else if(req.query.ano){
        Casamento.list({date: {$regex : req.query.ano + "/.*"}})
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(e => {
            res.sendStatus(500)
        })
    }
    else if(req.query.byAno){
        Casamento.list()
        .then(dados => {
            var ret = {dados : 0}
            dados.map(el => {

                if(ret[el.date.split('/')[0]] !== undefined){
                    ret[el.date.split('/')[0]].push(el)
                } else {
                    ret[el.date.split('/')[0]] = []
                    ret[el.date.split('/')[0]].push(el)
                }
            })

            res.jsonp(ret)
        })
        .catch(e => {
            res.status(500).jsonp({error: e})
        })
    }
    else {
    Casamento.list()
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(e => {
            res.sendStatus(500)
        })
    }
});

router.get('/casamentos/:id', function(req, res, next) {

    Casamento.lookUp(req.params.id)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(e => {
            res.status(500).jsonp({error: e})
        })
});







module.exports = router;
