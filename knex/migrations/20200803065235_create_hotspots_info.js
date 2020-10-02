
exports.up = function(knex) {
    return knex.schema.
    createTable('HOTSPOT', function(table) {
       table.float('lat',null,30);
       table.float('long',null,30);
       table.float("NO2",null,30);
       table.float('MIN_NO2',null,30);
       table.float('MEAN_NO2',null,30);
       table.integer('week').notNullable();
       table.string('month').notNullable();
       table.integer('year').notNullable();
       table.primary(['lat','long','week','month','year']);
       table.index(['lat'],'lat_index');
       table.index(['long'],'long_index')
       table.index(['week','month','year'],'time2')
   })
};

exports.down = function(knex) {
    return knex.schema.dropTable('GEODATA2');
};
