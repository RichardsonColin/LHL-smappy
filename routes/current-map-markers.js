const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    console.log('INSIDE CURRENT MAP ROUTE');
    console.log(req.body.map_data1.id);
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
