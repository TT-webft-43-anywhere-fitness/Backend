const express = require('express')

const router = express.Router()

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

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
    
    Users.findById(id)
    .then(data => {
        if (data) {
            req.userObj = data;
            next()
        }else{
            next({ code: 400, message: 'There is no user with id ' + id })
        }
    })
    .catch(error=> {
      next({ code: 500, message:error.message })
    })    
}

const validateBody = (req,res,next) => {
    const body = req.body

    if (!body){
        next({code:400, message: "you must have a username, password, and a role"})
    }else{
        req.bodyObj = body
        next()
    }
}

router.use((req,res,next) => {
    console.log('inside the users router');
    next();
})

router.get('/',(req,res) => {
    res.status(200).json({
        message:"you made it into the users router"
    })
})

// Build the API Endpoints

router.get('/:id', validateId, (req,res) => {
    res.status(200).json(req.userObj)
})

router.get('/:id/classes', validateId, (req,res) => {
    Users.findClassesByInstructor(req.params.id)
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