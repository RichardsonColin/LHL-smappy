
exports.up = function(knex, Promise) {
  return knex.schema.createTable('markers', function (table) {
    table.increments();
    table.float('lat');
    table.float('long');
    table.string('title');
    table.string('description');
    table.string('picture');
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('map_id');
    table.foreign('map_id').references('maps.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('markers');
};
