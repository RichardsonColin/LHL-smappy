"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const cookieSession = require('cookie-session');
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const bcrypt = require('bcrypt');

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(cookieSession({
  name: 'session',
  keys: ['Cleo'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login-test", (req, res) => {
  // console.log("hello");
  res.render("login-test");
});

app.post("/login", (req, res) => {
  const emailReq = req.body.email;
  const passwordReq = req.body.password;
  let pass;
  knex('users').where({
  email: emailReq }).select('password').then(
  function(result){
      pass = result;
      }).catch(function(error) {
  console.log(error);
  });

  if (passwordReq === pass){
    //login
  }
  res.redirect('login-test');
});

app.post("/logout", (req, res) => {
  console.log('logout id',req.session.user_id);
  req.session.user_id = null;
  console.log('logout id after logout',req.session.user_id);
  res.redirect('login-test');
});


function registerUser(email, password) {
  let user_id = 0;

  return knex('users')
    .insert({
      email: email,
      password: password
    })
    .returning('*')
    .then((users) => {

      console.log(users[0].id);
      user_id = users[0].id;

      return user_id;
    });
      // console.log('before return',user_id);
    // });
      // console.log('IM THE GODDAMN USER_ID BEFORE RETURN',user_id);
}


function checkEmailInDB(email) {
  // return new Promise((resolve, reject) => {

    return knex
      .select('email')
      .from('users')
      .where({'email': email})
      .then((users) => {
        return users.length !== 0;
      });
}





app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  // checkEmailInDB(email, password);

  //let check = registerUser(email, password);
  checkEmailInDB(email, password)
  .then(exists => {
    if (!exists) {
      return registerUser(email, password)
      .then(user_id => {
        req.session.user_id = user_id;
        console.log('right after registration ',req.session.user_id);
        res.redirect('login-test');
      });
    } else {
      res.status(400).send('Email has already been registered');
    }
  });
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
