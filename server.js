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
  console.log("hello");
  res.render("login-test");
});

app.post("/login", (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.password;
  console.log(req.session.user_id);

  res.redirect('login-test');
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  // console.log(`this is when we log out ${req.session.user_id}`);
  res.redirect('login-test');
});


function registerUser(email, password) {
  return new Promise((resolve, reject) => {
    let user_id = 0;
    knex('users')
      .insert({
        email: email,
        password: password
      })
      .returning('id')
      .asCallback(function(err, id) {
        console.log(id[0]);
        user_id = id[0];
        console.log(user_id);
    });
    return user_id;
      // console.log('IM THE GODDAMN USER_ID BEFORE RETURN',user_id);
    });
}


function checkEmailInDB(email) {
  return new Promise((resolve, reject) => {
    let returnEmailResult = false;
    knex
    .select('email')
    .from('users')
    .where({'email': email})
    .asCallback(function(err, result) {
        console.log("returning result", result.length);
      if (result.length === 0) {
        console.log("true");
        returnEmailResult = true;
      }
    });
    return returnEmailResult;
  });
}


function checkForm (email, password) {
 if (email || password === undefined){
  return true;
 } else {
  return false;
 }
}


app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  const formCheck = checkForm(email, password);

  if (formCheck) {
    //MOVE ON
    let emailCheck = checkEmailInDB(email);
      console.log("this should be true", emailCheck);
    if (emailCheck) {
      let id = registerUser(email, password);
      req.session.user_id = id;
      console.log(`I am the id that equals the user_id ${id}`);
      // console.log(`this is when the register ends ${req.session.user_id}`);
    } else {
      res.send("You already have an email in the db FINISH THIS MESSAGE LATER!!");
    }


  } else {
    res.send("You need to fill out the email \& password, KELSEY and REID UPDATE THIS SO ITDOESNT SEND YOU TO A DIF PAGE");
  }

  res.redirect("login-test");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
