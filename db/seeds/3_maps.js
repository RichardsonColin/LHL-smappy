
exports.seed = function(knex, Promise) {
  return knex('maps').insert([
    {id: 1, title: 'First, perhaps greatest map', user_id: 1, lat: 48.425, long: -123.363, zoom: 14},
    {id: 2, title: 'Antartica pengu', user_id: 1, lat: -74.763, long: -45.3516, zoom: 4},
    {id: 3, title: 'Spots I saw animals', user_id: 1, lat: 48.425, long: -123.3630, zoom: 14}
  ]);
};

