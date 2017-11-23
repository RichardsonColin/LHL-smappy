exports.seed = function(knex, Promise) {
  console.log('im first');
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice Cooper', email: 'alice@coop.ca', password: 'password', your_location: 'Victoria', your_description: 'Cool dude'})
      ]);
    });
};
