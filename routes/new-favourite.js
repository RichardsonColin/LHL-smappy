"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // The map is added to favourites when a user clicks 'Add to favourites' in the left nav.
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

