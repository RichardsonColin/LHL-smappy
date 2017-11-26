
exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('markers').insert([
    {lat: 48.4244, long: -123.361, title: 'The Summit', description: 'Where it is always cold', picture: 'http://lorempixel.com/output/city-q-c-250-250-4.jpg', user_id: 1, map_id: 1},
    {lat: 48.4267, long: -123.37, title: 'The Joint', description: 'Best Post Bar Pizza ', picture: 'http://lorempixel.com/output/nature-q-c-250-250-5.jpg', user_id: 1, map_id: 1},
    {lat: 48.4308, long: -123.361, title: 'The Boom Boom Room', description: 'Since \'94', picture: 'http://lorempixel.com/output/abstract-q-c-250-250-7.jpg', user_id: 1, map_id: 1},
    {lat: 48.4352, long: -123.3654, title: 'I once saw a cat here', description: 'It was black', picture: 'https://img.huffingtonpost.com/asset/582cb2601a00002400cc8426.jpeg', user_id: 1, map_id: 3},
    {lat: 48.4279, long: -123.3617, title: 'I once saw a dog here', description: 'I petted it for hours', picture: 'http://www.dogbreedplus.com/dog_categories/images/chow_chow.jpg', user_id: 1, map_id: 3},
    {lat: 48.4276, long: -123.3673, title: 'I once saw a rat here', description: 'I threw rocks at it', user_id: 1, map_id: 3}
  ]);
};
