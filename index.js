const axios = require('axios');
const express = require('express');
const app = express();
const expressip = require('express-ip');
const PORT = process.env.PORT || 5000;
const path = require('path');
app.set("PORT", PORT); 

app.use(expressip().getIpInfoMiddleware);


const handlebars = require('express-handlebars');

app.engine('.hbs', handlebars({ extname: '.hbs',defaultLayout: false }));

app.set("PORT", PORT);


app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {

    res.render("index", {title:"username"});
});

app.get('/search', function (req, res) {
    queries = req.query;
    let url = `https://indreed.herokuapp.com/api/jobs`;
    if (queries){
        axios.get(url, {
        params: queries
    })
    .then(function(response){
        res.render("search", { jobs: response.data});

    })
    .catch(function(error) {
        console.log(error);
    });
    }
    else {
        res.render("search")
    }
    

});


//server connnection open
app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') );
});