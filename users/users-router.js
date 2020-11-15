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
    
    Project.get(id)
    .then(data => {
        if (data) {
            req.project = data;
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

    if (!body.description || !body.name){
        next({code:400, message: "you must have a description and name"})
    }else{
        req.payload = body
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


router.use((err, req, res, next) => {
    res.status(err.code).json({ message: err.message })
});

module.exports = router