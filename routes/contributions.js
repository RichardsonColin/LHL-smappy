"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Gets maps where the map.id in the maps table matches the map.id in the contributions table.
  router.get("/", (req, res) => {
    knex
      .select()
      .from("maps")
      .whereIn('maps.id',
        knex
          .select()
          .from('contributions')
          .distinct('contributions.map_id')
          .where('contributions.user_id', req.session.user_id)
      )
        .then((results) => {
          res.json(results);
    });
  });

  return router;
};
