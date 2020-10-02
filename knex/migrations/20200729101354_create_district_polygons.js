
exports.up = function(knex) {
    return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS postgis')
    .raw('CREATE EXTENSION IF NOT EXISTS postgis_topology')
    .raw('CREATE EXTENSION IF NOT EXISTS fuzzystrmatch')
    // .raw('CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder')
    .raw(`SET SCHEMA 'public'`)
    .raw('CREATE EXTENSION IF NOT EXISTS pg_trgm')
    .createTable('District_Polygons', function(table) {
        table.string('state').notNullable();
        table.string('district').notNullable();
        table.specificType('geometry', 'geometry(MULTIPOLYGON, 4326)').notNullable();
        table.primary(['state','district']);
        table.index(['state'],'state');
        table.index(['district'],'district');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('District_Polygons');

};
