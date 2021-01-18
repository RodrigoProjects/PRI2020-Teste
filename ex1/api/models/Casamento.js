var mongoose = require('mongoose')

var alunoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    title: String,
    href: String
});

module.exports = mongoose.model('casamentos', alunoSchema)