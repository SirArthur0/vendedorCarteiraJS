exports.up = function(knex, Promise) {
  return knex.schema.createTable('vendedor', table => {
    table.increments('id').primary()
    table.string('nome').notNull()
    table.string('email').notNull().unique()
    table.string('password').notNull()
})
  };
  
  
  exports.down = function(knex) {
    return knex.schema.dropTable('vendedor')
  };