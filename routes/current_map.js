const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .where("id", req.params.id)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
