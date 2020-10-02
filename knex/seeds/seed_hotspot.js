let files=[];
var glob = require( 'glob' )
  , path = require( 'path' );
  glob.sync( '/home/bhoomik/Desktop/Json Hotspots/*.json' ).forEach( function( file ) {
    var f=require( path.resolve( file ) );
    files.push(f);
  });


// const hotspot=require("/home/bhoomik/Downloads/csvjson2.json")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('HOTSPOT').del()
    .then(function () {
      let data=[];
      files.forEach((hotspot)=>{
        for(var i=0;i<hotspot.length;i++){
          const tobeadded={
            "lat":hotspot[i]["latitude"],
            "long":hotspot[i]["longitude"],
            "NO2":hotspot[i]["max_tropospheric_NO2_column_number_density"],
            "MIN_NO2":hotspot[i]["min_tropospheric_NO2_column_number_density"],
            "MEAN_NO2":hotspot[i]["mean_tropospheric_NO2_column_number_density"],
            "week":hotspot[i]["week"],
            "month":hotspot[i]["month"].toLowerCase(),
            "year":hotspot[i]["year"]
          }
          data.push(tobeadded);
        }    
      })
       return knex('HOTSPOT').insert(data);
    });
};
