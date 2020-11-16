const express = require('express')
const router = express.Router()

const Classes = require("./classes-model")
const restricted = require('../auth/restricted-middleware')
const { response } = require('../api/server')

function roleChecker(role) {
    return function (req, res, next) {
      if (req.decodedJwt.role === role) {
        next()
      } else {
        res.status(401).json({ message: "Sorry, You are not authorized to access this" })
      }
    }
}

const validateId = (req,res,next) => {
    const id = req.params.id

    Classes.findById(id)
    .then(data => {
        if(data) {
            req.classObj = data
        }else{
            next({code:400, message: "There is no class with id " + id})
        }
    })
    .catch(error => {
        next({code:500,message:error.message})
    })
}

const validateBody = (req,res,next) => {
    const body = req.body

    if (!body){
        next({code:400, message: "you must have a description and name"})
    }else{
        req.bodyObj = body
        next()
    }
}

// Build api endpoints here



router.post('/', validateBody, (req,res) => {
    Classes.insert(req.bodyObj)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({message:error.message})
    })
})

router.get('/', (req,res) => {
    Classes.getAll()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(400).json({message:error.message})
    })
})

router.get('/:id', validateId, (req,res) => {
    res.status(200).json(req.classObj)
})

router.put('/:id', validateId, validateBody, (req,res) => {
    Classes.update(req.id,req.body)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({message:error.message})
    })
})

router.delete('/:id', validateId, (req,res) => {
    Classes.remove(req.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message:error.message})
    })
})


router.use((err, req, res, next) => {
    res.status(err.code).json({ message: err.message })
});

module.exports = router