"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

// console.log("hello from favorites");

  router.post("/", (req, res) => {
     return knex('favourite_maps')
    .insert({user_id: req.session.user_id,
             map_id: req.body.map_data1.id})
    .returning('*')
    .then((mapData) => {
    res.send(String(mapData));
    });
  });

  return router;
};

