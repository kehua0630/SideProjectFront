


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const Account = require('./models/account')

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
mongoose.connect('mongodb+srv://chaokehuawork:GPsf75MpfVeNpufb@cluster0.mlowz.mongodb.net/')
.then(() => {
    console.log('mongodb connected!')
 })
 .catch(() => {
    console.log('mongodb failed!')
 })

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
// app.post("/api/posts", (req, res, next) => {
//     // TODO save req.body to DB
//     console.log('/api/posts post request', req.body);

//     res.status(201).json({
//         message:'post successfully!'
//     });
// })

app.post('/accounts', (req, res, next) => {
    console.log('post accounts')
    const account = new Account({
        userName: req.body.userName,
        pwd: req.body.pwd,
        inUse: req.body.inUse,
        func: req.body.func,
        createTime: req.body.createTime,
    });

    console.log(account)

    res.status(201).json({
        RetCode: '00',
        RetMsg: '新增成功！',
    });
})

app.get("/accounts", (req, res, next) => {
    console.log('get accounts')
    res.status(200).json({
        RetCode: '00',
        RetMsg: '',
        RetResult: [
            {
                userName: 'test1',
                createTime: '2024/09/05 21:00:00',
                inUse: 'Y',
                pwd: 'test123',
                func: ['account', 'marquee', 'upload-pdf']
            },
            {
                userName: 'test2',
                createTime: '2024/09/06 21:00:00',
                inUse: 'Y',
                pwd: 'test123',
                func: ['account', 'marquee', 'upload-pdf']
            }
        ],
    });
});

app.delete("/accounts", (req, res, next) => {
    res.status(200).json({
        RetCode: '00',
        RetMsg: '',
        RetResult: [
            {
                userName: 'test1',
                createTime: '2024/09/05 21:00:00',
                inUse: 'Y',
                pwd: 'test123',
                func: ['account', 'marquee', 'upload-pdf']
            },
            {
                userName: 'test2',
                createTime: '2024/09/06 21:00:00',
                inUse: 'Y',
                pwd: 'test123',
                func: ['account', 'marquee', 'upload-pdf']
            }
        ],
    });
});


module.exports = app;