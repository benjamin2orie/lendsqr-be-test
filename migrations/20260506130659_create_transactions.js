// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function(knex) {
  
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function(knex) {
  
// };




exports.up = function (knex) {
  return knex.schema.createTable('transactions', table => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('wallet_id').notNullable()
         .references('id').inTable('wallets').onDelete('CASCADE');
    table.enum('type', ['fund', 'transfer', 'withdraw']).notNullable();
    table.decimal('amount', 14, 2).notNullable();
    table.json('metadata');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};


