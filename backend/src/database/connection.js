// sql builder 
const knex = require('knex');
// arquivo que irá levar ao diretório
const configuration = require('../../knexfile');
// qual dos objetos linkara ao DB
const connection = knex(configuration.development);

module.exports = connection;