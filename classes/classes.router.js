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
        res.status(401).json({ message: "Sorry, You are not authorized to access this",type:"roleChecker" })
      }
    }
}

const validateId = (req,res,next) => {
    const id = req.params.id

    Classes.findById(id)
    .then(data => {
        if(data) {
            req.classObj = data
            next()
        }else{
            next({code:400, message: "There is no class with id " + id,type:"validateId"})
        }
    })
    .catch(error => {
        next({code:500,message:error.message,type:"validateId"})
    })
}

const validateBody = (req,res,next) => {
    const body = req.body

    if (!body){
        next({code:400, message: "you must have a description and name",type:"validateBody"})
    }else{
        req.bodyObj = body
        next()
    }
}

// Build api endpoints here



router.post('/',validateBody, (req,res) => {
    console.log(req.bodyObj)
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

router.get('/:id', validateId,validateBody, (req,res) => {
    res.status(200).json(req.classObj)
})

router.put('/:id', validateId, validateBody, (req,res) => {
    Classes.update(req.params.id,req.body)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({message:error.message})
    })
})

router.delete('/:id', validateId, (req,res) => {
    Classes.remove(req.params.id)
    .then(data => {
        res.status(200).json({id:req.params.id})
    })
    .catch(error => {
        res.status(500).json({message:error.message})
    })
})

//Attendees endpoints

router.post('/:id/attendees',validateId, validateBody, (req,res) => {
    const user_id = req.bodyObj.user_id
    const class_id = req.params.id
    console.log("req.body.user ===> ",user_id," req.params.id ===> ",class_id)
    Classes.enrollAttendee(user_id,class_id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message:error.messsage})
    })
})

router.get('/:id/attendees',validateId, (req,res) => {
    Classes.getAttendeesByClass(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message:error.messsage})
    })
})

router.delete('/:id/attendees',validateId, validateBody, (req,res) => {
    Classes.removeAttendee(req.params.id,req.body.user_id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message:error.messsage})
    })
})


router.use((err, req, res, next) => {
    res.status(err.code).json({ message: err.message, type:err.type })
});

module.exports = router

