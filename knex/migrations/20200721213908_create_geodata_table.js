exports.up = function(knex) {
    return knex.schema.
     createTable('GEODATA2', function(table) {
        table.string('state').notNullable();
        table.string('district').notNullable();
        table.float('CO',null,30);
        table.float('NO2',null,30);
        table.float("SO2",null,30);
        table.float('O3',null,30);
        table.float('MIN_CO',null,30);
        table.float('MIN_NO2',null,30);
        table.float("MIN_SO2",null,30);
        table.float('MIN_O3',null,30);
        table.float('MEAN_CO',null,30);
        table.float('MEAN_NO2',null,30);
        table.float("MEAN_SO2",null,30);
        table.float('MEAN_O3',null,30);
        table.integer('week').notNullable();
        table.string('month').notNullable();
        table.integer('year').notNullable();
        table.primary(['state','district','week','month','year']);
        table.index(['state'],'state_index');
        table.index(['district'],'district_index')
        table.index(['week','month','year'],'time')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('GEODATA2');
};
