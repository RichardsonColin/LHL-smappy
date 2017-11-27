"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Gets the current signed in user.
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where({id: req.session.user_id})
      .then((results) => {
        res.json(results);
    });
  });
  return router;
};


