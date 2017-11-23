
exports.seed = function(knex, Promise) {
      // Inserts seed entries
      return knex('markers').insert([
        {lat: 48.4244, long: -123.361, title: 'The Summit', description: 'Where it is always cold', picture: 'http://lorempixel.com/output/city-q-c-250-250-4.jpg', user_id: 1, map_id: 1},
        {lat: 48.4267, long: -123.37, title: 'The Joint', description: 'Best Post Bar Pizza ', picture: 'http://lorempixel.com/output/nature-q-c-250-250-5.jpg', user_id: 1, map_id: 1},
        {lat: 48.4308, long: -123.361, title: 'The Boom Boom Room', description: 'Since \'94', picture: 'http://lorempixel.com/output/abstract-q-c-250-250-7.jpg', user_id: 1, map_id: 1}
      ]);
};
