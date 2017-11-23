
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('contributions', function(table){
      table.increments();
      table.integer('map_id');
      table.integer('user_id');
      table.date('datestamp');
      table.foreign('user_id').references('users.id');
      table.foreign('map_id').references('maps.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('contributions')
  ])
};
