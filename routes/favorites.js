"use strict";

const express = require('express');
const router  = express.Router();

const userId = 1; //req.session.user_id
module.exports = (knex) => {

console.log("hello from favorites");

  router.get("/", (req, res) => {
    console.log('inside the get');
    knex
      .select("title")
      .from("maps")
      .innerJoin('favourite_maps', 'favourite_maps.map_id', 'maps.id')
      .where('favourite_maps.user_id', userId)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
