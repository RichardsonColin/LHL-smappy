const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Displays markers if any are created.
  router.post("/", (req, res) => {
    console.log("data fed into the current map markesrs route", req.body)
    knex
    .select('*')
    .from('markers')
    .where({map_id: req.body.map_data1.id})
    .then((results) => {
      res.json(results);
    });
  });

  return router;
};
