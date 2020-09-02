const mongoose = require('mongoose')

let diamondSchema = new mongoose.Schema({
    GIAnumber: {
        type: Number,
        required: true,
    },
    shapeAndStyle: {
        type: String,
        default: 'Round Brilliant'
    },
    caratWeight: {
        type: Number,
        required: true
    },
    colorGrade: {
        type: String,
        required: true
    },
    clarityGrade: {
        type: String,
        required: true
    },
    cutGrade: {
        type: String,
        required: true
    },
    polish:{
        type: String,
        required: true
    },
    symmetry: {
        type: String,
        required: true
    },
    fluorescence: {
        type: String,
        default: 'None'
    },
    price: Number
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Owner'
    // }
})

module.exports = mongoose.model('Diamond', diamondSchema)