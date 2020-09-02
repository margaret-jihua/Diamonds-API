const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    diamonds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diamond'
    }],
    email: String,
    phone: String
})

module.exports = mongoose.model('Owner', ownerSchema)
