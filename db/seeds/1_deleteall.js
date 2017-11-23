
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favourite_maps').del()
    .then(function () {
      return knex('contributions').del()
        .then(function () {
          return knex('markers').del()
            .then(function () {
              return knex('maps').del()
                .then(function () {
                  return knex('users').del()
                });
            });
        });
    });
};