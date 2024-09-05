


const express = require('express');
const bodyParser = require('body-parser');
const account = express();

account.use(bodyParser.json());
// account.use(bodyParser.urlencoded({ extended: false }));

account.use((req, res, next) => {
    // allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE")

    // continue
    next();
});

account.use("/accounts", (req, res, next) => {
    res.status(200).json({
        RetCode: '00',
        RetMsg: '',
        RetResult: [
            {
                userName: 'test1',
                createTime: '2024/09/05 21:00:00',
                inUse: 'Y'
            }
        ],
    });
});

// post request
account.post("/api/posts", (req, res, next) => {
    // TODO save req.body to DB
    console.log('/api/posts post request', req.body);

    res.status(201).json({
        message: 'post successfully!'
    });
})




module.exports = account;