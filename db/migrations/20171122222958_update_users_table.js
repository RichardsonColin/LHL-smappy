
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('email');
    table.string('password');
    table.string('your_location');
    table.string('your_description');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.dropColumns('email', 'password', 'your_location', 'your_description');
  });
};

