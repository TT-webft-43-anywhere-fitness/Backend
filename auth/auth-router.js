const bcryptjs = require("bcryptjs");
// import the library
const jwt = require('jsonwebtoken');
const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

// pull in the secret we'll use to make the JWT
const { jwtSecret } = require('./secrets.js');



const validateBody = (req,res,next) => {
    const body = req.body

    if (!body){
        next({code:400, message: "you must have a username, password, and a role"})
    }else{
        req.bodyObj = body
        next()
    }
}


router.post("/register", validateBody, (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "credentials are invalid",
    });
  }
});

router.post("/login", validateBody, (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
          console.log(user)
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user) 
          res.status(200).json(
              {
                id:user.id,
                role:user.role, 
                message: `Welcome to our API ${user.username}`, 
                token 
            }); 
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "credentials are invalid",
    });
  }
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };
  const options = {
    expiresIn: '30 minutes',
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
