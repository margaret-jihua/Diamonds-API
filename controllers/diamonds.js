const router = require('express').Router()

const db = require('../models')
const { findByIdAndRemove } = require('../models/diamond')

//GET /diamonds
router.get('/', (req, res) => {
    db.Diamond.find()
    .then(foundDiamonds => {
        res.send(foundDiamonds)
    })
    .catch( err => {
        console.log(err);
        res.status(503).send({message: 'Database asleep?'})
    })
})

// GET /diamonds/:id
router.get('/:id', (req, res) => {
    db.Diamond.findById(req.params.id)
    .then(foundDiamond => {
        if (foundDiamond) {
            res.send(foundDiamond)
        } else {
            res.status(404).send({message: 'Resource not located'})
        }        
    })
    .catch( err => {
        console.log(err);
        res.status(503).send({message: 'Service Unavailable'})
    })
})

// GET /diamonds/:

// POST /diamonds
router.post('/', (req, res) => {
    console.log(req.body)
    db.Diamond.create(req.body)
    .then(createdDiamond => {
        console.log(createdDiamond);
        res.status(201).send(createdDiamond)
    })
    .catch(err => {
        console.log('Error while creating', err);
        if(err.name === 'ValidationError'){
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message:'Database or server error!'})
        }
    })
})

// PUT /diamonds/:id
router.put ('/:id', (req, res) => {
    db.Diamond.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedDiamond => {
        res.send(updatedDiamond)
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})

// DELETE /diamonds/:id
router.delete('/:id', (req,res) => {
    db.Diamond.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send()
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})

module.exports = router