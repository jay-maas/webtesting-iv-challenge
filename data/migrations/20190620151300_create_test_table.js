
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable('characters', table => {
          table.increments()
        
          table
              .string('name', 64)
              .notNullable()

          table
              .string('image')
        
      })
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('characters')
};
