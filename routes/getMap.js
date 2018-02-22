const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Gets the map data.
  router.post("/", (req, res) => {
    console.log("data fed into the get map route", req.body)
    knex
    .select('*')
    .from('maps')
    // .where('id', req.params.id)
    .where('id', req.body.id)
    .then((results) => {
      if(results) {
        console.log("Map data in api route", results);
        res.json(results[0]);
      } else {
        res.status(404).send("Map doesn't exist");
      }
    });
  });

  return router;
};
