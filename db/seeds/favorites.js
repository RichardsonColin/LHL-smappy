
exports.seed = function(knex, Promise) {
        return knex('favourite_maps').insert([
        {user_id: 1, map_id: 1}
      ]);
};
