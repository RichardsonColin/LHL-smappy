"use strict";

const express = require('express');
const router  = express.Router();

const userId = 1; //req.session.user_id

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select()
      .from("maps")
      .whereIn('maps.id',
        knex
          .select()
          .from('contributions')
          .distinct('contributions.map_id')
          .where('contributions.user_id', userId)
      )
        .then((results) => {
          res.json(results);
    });
  });

  return router;
}
