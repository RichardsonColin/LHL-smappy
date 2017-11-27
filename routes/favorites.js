"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Gets the user's favorited maps.
  router.get("/", (req, res) => {
    knex
    .select('*')
    .from('maps')
    .whereIn("maps.id",
      knex
      .select('favourite_maps.map_id')
      .from('favourite_maps')
      .where('favourite_maps.user_id', req.session.user_id)
      )
      .then((results) => {
        res.json(results);
      });
  });
  return router;
};
