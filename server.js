
const express = require("express");
const PORT = 3021
const app = express();
const bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});
app.use(express.json());
app.use(bodyParser.json());


const yelp = require("yelp-fusion")
const client = yelp.client('PvGaFk2VAiRwMTWLusp44E7tuTe9zcBYhy_J9RyHVbwiR8yy5LbFeAxJ_ppLTN_N6wkgZM8ElyRQLzBJS4726tpukC9R23DMBsqtU4M0eUIYvgYfzoUnru8_BUqMYXYx');

class Restaurant {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }
}
let restaurantList = []

app.post('/restaurants', (req, res) => {
    restaurantList = [];

    console.log(req.body);
    let term = req.body.term;
    let location = req.body.location;
    console.log(term + " and " + location);

    client
        .search({
            term: term,
            location: location
        })
        .then(response => {
            // console.log(response.jsonBody.businesses)
            for (var x = 0; x < 16; x++) {
                console.log(response.jsonBody.busninesses[x].name + response.jsonBody.businesses[x].location);
                let rest = new Restaurant(
                    response.jsonBody.businesses[x].name,
                    response.jsonBody.businesses[x].location
                );
                restaurantList.push(rest);
            }
            res.send(JSON.stringify(restaurantList));
        })
        .catch(e=>{
            console.log(e)
        });
});

const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');


const url = 'http://www.chinesefoodhistory.com/'; // Enter URL of site to be scraped here

app.get('/display', (req, res) => {
    axios(url)
        .then(response => {
            const txt = response.data;
            const $ = cheerio.load(txt);
            const para = [];

            const data = 'div.container > div > div.col-lg-8.col-md-12.col-sm-12.col-12 > div.row > div:nth-child(1)'; // Paste JS Path here
            $(data, txt).each(function () {
                const passage = $(this).text();
                para.push({
                    passage
                })
            })
            res.json(para);
        }).catch(err => console.log(err));

});

app.listen(PORT,()=>{
    console.log();
})
