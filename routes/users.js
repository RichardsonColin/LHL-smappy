"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // console.log('hello');

  router.get("/", (req, res) => {
    // console.log();
    // var obj = JSON.parse(req.query.id);
    console.log();
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


