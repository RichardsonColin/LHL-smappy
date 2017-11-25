"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

console.log("hello from favorites");

  router.get("/", (req, res) => {
    console.log('inside the get');
    knex
      .select('*')
      .from("maps")
      // .innerJoin('favourite_maps', 'favourite_maps.map_id', 'maps.id')
      .where({user_id: req.session.user_id})
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
