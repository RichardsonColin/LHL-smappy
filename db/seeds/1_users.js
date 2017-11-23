exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Alice Cooper', email: 'alice@coop.ca', password: 'password', your_location: 'Victoria', your_description: 'Cool dude'})
      ]);
    });
};
