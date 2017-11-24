
exports.up = function(knex, Promise) {
  return knex.schema.table('maps', function (table) {
    table.float('lat');
    table.float('long');
    table.string('zoom');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('maps', function(t) {
    t.dropColumns('lat', 'long', 'zoom');
  });
};
