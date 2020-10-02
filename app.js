const express = require("express");
const compression = require('compression')
const app = express();
const knex = require('./knex/knex.js');
const knexPostgis = require('knex-postgis');
const cors = require("cors");
const path = require("path");
var fs = require('fs');
var geobuf = require("geobuf");
var Pbf = require('pbf');


app.use(compression())

const st = knexPostgis(knex)

app.set("trust proxy", 1);
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    next();
});


app.get("/api", async (req, res) => {

    try {
        const latestDefaults = {
            "week": 1,
            "month": "january",
            "year": 2020,
            "type": "NO2"
        }
        if ((req.query.week && isNaN(parseInt(req.query.week))) || (req.query.year && isNaN(parseInt(req.query.year)))) {
            throw "Invalid Request";

        }
        const parsedweek = parseInt(req.query.week);
        const parsedyear = parseInt(req.query.year);

        const week = parsedweek || latestDefaults["week"]
        var month = req.query.month || latestDefaults["month"];
        month = month.toLowerCase();
        const year = parsedyear || latestDefaults["year"];
        const type = req.query.type || latestDefaults["type"];
        var start = new Date().getTime();
        const sql2 = await knex('GEODATA2').innerJoin('District_Polygons', function () {
            this.on('GEODATA2.state', '=', 'District_Polygons.state').andOn('GEODATA2.district', '=', 'District_Polygons.district')
        }).select(`GEODATA2.${type}`, st.asGeoJSON('geometry')).where({
            week: week,
            month: month,
            year: year
        })


        var geojson = {
            "type": "FeatureCollection",
            "features": []
        }
        for (var i = 0; i < sql2.length; i++) {
            var tobeadded = {
                "type": "Feature",
                "properties": {},
                "geometry": JSON.parse(sql2[i]["geometry"])
            }
            for (var key in sql2[i]) {
                if (key !== 'geometry') {
                    tobeadded["properties"][key] = sql2[i][key]
                }
            }
            geojson.features.push(tobeadded)
        }


        var packed = geobuf.encode(geojson, new Pbf());
        packed = Buffer.from(packed);

        res.send(packed);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
})

app.get("/api/hotspot", async (req, res) => {
    try {
        const latestDefaults = {
            "week": 1,
            "month": "january",
            "year": 2020,
            "type": "NO2"
        }
        if ((req.query.week && isNaN(parseInt(req.query.week))) || (req.query.year && isNaN(parseInt(req.query.year)))) {
            throw "Invalid Request";

        }
        const parsedweek = parseInt(req.query.week);
        const parsedyear = parseInt(req.query.year);

        const week = parsedweek || latestDefaults["week"]
        var month = req.query.month || latestDefaults["month"];
        month = month.toLowerCase();
        const year = parsedyear || latestDefaults["year"];
        const sql2 = await knex('HOTSPOT').select("lat", "long").where({
            week: week,
            month: month,
            year: year
        })
        res.send(sql2)
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
})

app.get("/api/distinfo", async (req, res) => {
    try {
        const lat = req.query.lat;
        const long = req.query.long;
        const result = await knex.select().from("HOTSPOT").where({
            lat: lat,
            long: long
        })
        console.log(result.length);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
    }
})
app.get("/api/random", async (req, res) => {
    const sql = await knex.select('state', 'district', st.asGeoJSON('geometry')).table('District_Polygons');
    fs.writeFile("/home/bhoomik/Desktop/polygons.json", JSON.stringify(sql), function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.send({});
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
    console.log(`server is running on port ${PORT}`)
})