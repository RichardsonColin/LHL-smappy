
exports.seed = function(knex, Promise) {
  return knex('maps').insert([
    {id: 1, title: 'map dummy title', user_id: 1},
    {id: 2, title: 'Antartica pengus', user_id: 1},
    {id: 3, title: 'Spots I saw animals', user_id: 1, lat: 48.425, long: -123.3630, zoom: 14}
  ]);
};
