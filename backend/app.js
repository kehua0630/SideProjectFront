


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// basic use, show message send on localhost:3000
// app.use((req, res, next) => {
//     console.log('first middleware');
//     next();
// });

// app.use((req, res, next) => {
//     res.send('res send from express!');
// });

// get json data from localhost:3000/api/posts (GET request)

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE")

    // continue
    next();
});

// post request
app.post("/api/posts", (req, res, next) => {
    // TODO save req.body to DB
    console.log('/api/posts post request', req.body);

    res.status(201).json({
        message:'post successfully!'
    });
})

app.use("/api/posts", (req, res, next) => {
    console.log('/api/posts');

    res.status(200).json({
        message: 'json data from /api/posts'
    });
});


module.exports = app;