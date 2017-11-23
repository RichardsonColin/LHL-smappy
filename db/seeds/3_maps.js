
exports.seed = function(knex, Promise) {
  return knex('maps').insert([
    {id: 1, title: 'map dummy title', user_id: 1}
  ]);
};
