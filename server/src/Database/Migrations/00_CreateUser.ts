import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('document').notNullable();
        table.date('dataNasc').notNullable();
        table.string('gender', 1).notNullable();
        table.string('uf', 2).notNullable();
        table.string('city').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}