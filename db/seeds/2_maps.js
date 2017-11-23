
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {title: 'map dummy title', user_id: 1}
      ]);
    });
};
