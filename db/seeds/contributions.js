
exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('contributions').insert([
    {map_id: 1, user_id: 1},
    {map_id: 1, user_id: 1},
    {map_id: 2, user_id: 1}
  ]);
};
