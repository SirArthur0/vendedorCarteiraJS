exports.up = function(knex) {
  return knex.schema.createTable('carteira', table => {
    table.increments('id').primary()
    table.integer('revendaId').references('id').inTable('revenda')
    table.integer('vendedorId').references('id').inTable('vendedor')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('carteira')
};
