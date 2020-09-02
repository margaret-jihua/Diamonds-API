const router = require('express').Router()

const db = require('../models')
const { findByIdAndRemove } = require('../models/owner')

//GET /owners
router.get('/', (req, res) => {
    db.Owner.find().populate('diamonds')
    .then(foundOwners => {
        res.send(foundOwners)
    })
    .catch( err => {
        console.log(err);
        res.status(503).send({message: 'Database asleep?'})
    })
})

// GET /owners/:id
router.get('/:id', (req, res) => {
    db.Owner.findById(req.params.id)
    .then(foundOwner => {
        if (foundOwner) {
            res.send(foundOwner)
        } else {
            res.status(404).send({message: 'Resource not located'})
        }        
    })
    .catch( err => {
        console.log(err);
        res.status(503).send({message: 'Service Unavailable'})
    })
})

// POST /owners
router.post('/', (req, res) => {
    console.log(req.body)
    db.Owner.create(req.body)
    .then(createdOwner => {
        console.log(createdOwner);
        res.status(201).send(createdOwner)
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

// PUT /owners/:id
router.put ('/:id', (req, res) => {
    db.Owner.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedOwner => {
        res.send(updatedOwner)
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})

// DELETE /owners/:id
router.delete('/:id', (req,res) => {
    db.Owner.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send()
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})

module.exports = router