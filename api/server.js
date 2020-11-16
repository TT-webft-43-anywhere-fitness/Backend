const express = require("express");
const helmet = require("helmet");
const morgan = require('morgan')

// MAKE THE AUTH ROUTER 
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const classesRouter = require('../classes/classes.router.js')

const server = express();

server.use(helmet());
server.use(morgan('dev'))
server.use(express.json());
// server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/classes", classesRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;