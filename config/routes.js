const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserHelper = require("../user/user-model.js");
const jwtKey = require("../auth/secrets.js");

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    console.log("::: WITHIN USER REGISTRATION :::");
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    let addUser = await UserHelper.add(user);
    res.status(201).json(addUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function login(req, res) {
  // implement user login
  try {
    let { username, password } = req.body;
    let user = await UserHelper.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome! ${user.username}`, token });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtKey.jwtSecret, options);
}
