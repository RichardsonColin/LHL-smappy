const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Displays markers if any are created.
  router.post("/", (req, res) => {
    knex
    .select('*')
    .from('markers')
    .where('map_id', req.body.id)
    .then((results) => {
      res.json(results);
    });
  });

  return router;
};
