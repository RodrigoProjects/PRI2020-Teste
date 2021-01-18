// User controller

var Casamento = require('../models/Casamento')

// Returns User list
module.exports.list = (cond = {}, proj = {}) => {
    return Casamento
        .find(cond, proj)
        .exec()
}

// Returns User list
module.exports.aggreg = (cond = {}) => {
    return Casamento
        .aggregate(cond)
        .exec()
}

module.exports.lookUp = (id) => {
    return Casamento
        .findOne({"_id":id})
        .exec()
}

