


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const accountRoutes = require('./routes/account');
const loginRoutes = require('./routes/login');

// basic use, show message send on localhost:3000
// app.use((req, res, next) => {
//     console.log('first middleware');
//     next();
// });

// app.use((req, res, next) => {
//     res.send('res send from express!');
// });

// get json data from localhost:3000/api/posts (GET request)

// conncet to mongoDB
// side-project→ name of DB
mongoose.connect('mongodb+srv://chaokehuawork:GPsf75MpfVeNpufb@cluster0.mlowz.mongodb.net/side-project?retryWrites=true')
    .then(() => {
        console.log('mongodb connected!')
    })
    .catch(() => {
        console.log('mongodb failed!')
    })

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
    // allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")

    // continue
    next();
});

app.use('/accounts', accountRoutes);
app.use('/login', loginRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
});

// post request
// app.post("/api/posts", (req, res, next) => {
//     // TODO save req.body to DB
//     console.log('/api/posts post request', req.body);

//     res.status(201).json({
//         message:'post successfully!'
//     });
// })




module.exports = app;