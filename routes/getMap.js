const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Gets the map data.
  router.post("/", (req, res) => {
    knex
    .select('*')
    .from('maps')
    .where('id', req.body.id)
    .then((results) => {
      if(results) {
        res.json(results[0]);
      } else {
        res.status(404).send("Map doesn't exist");
      }
    });
  });

  return router;
};
