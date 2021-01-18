const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

function getToken(){
  return axios.post("http://clav-api.di.uminho.pt/v2/users/login", {
    username: "pri2020@teste.uminho.pt", password:"123"
  })
    
}


/* GET home page. */
router.get('/', async function(req, res, next) {
  let dados = await getToken()

  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + dados.data.token)
    .then(dados => {
      res.render('index', {level: 1, classes: dados.data});
    })
  
});


router.get('/classes/:id', async function(req, res, next) {

  let dados = await getToken()
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + req.params.id + "?token=" + dados.data.token)
    .then(dados => {
      res.render('class', {dados: dados.data});
    })
  
});

module.exports = router;
