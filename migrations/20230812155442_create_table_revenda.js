/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('revenda', table =>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('cnpj').notNull().unique()
        table.integer('mpnid').notNull()
        table.integer('desconto').notNull()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('revenda')
};
