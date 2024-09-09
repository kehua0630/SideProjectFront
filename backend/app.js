


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

app.use((req, res, next) => {
    // allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")

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

    console.log(account);
    // save to db as accounts
    account.save().then(newAccount => {

        // 傳回新增的ID, 寫回前端, 不用重新摳api, get全部資料
        res.status(201).json({
            RetCode: '00',
            RetMsg: '新增成功！',
            RetResult: newAccount._id
        });
    });
})

app.get("/accounts", (req, res, next) => {
    console.log('get accounts');
    // TODO add fiter data
    Account.find()
        .then(documents => {
            console.log(documents);
            res.status(200).json({
                RetCode: '00',
                RetMsg: '',
                RetResult: documents,
            });
        });
});

app.put("/accounts/:id", (req, res, next) => {
    console.log('put req ID::', req.params.id);
    const account = new Account({
        _id: req.params.id,
        userName: req.body.userName,
        pwd: req.body.pwd,
        inUse: req.body.inUse,
        func: req.body.func,
        createTime: req.body.createTime,
    });

    Account.updateOne({ _id: req.params.id }, account)
        .then(result => {
            console.log(result);
            res.status(200).json({
                RetCode: '00',
                RetMsg: `更新成功！`,
            });
        })
});

app.delete("/accounts/:id", (req, res, next) => {
    console.log('delete req ID::', req.params.id);
    Account.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({
                RetCode: '00',
                RetMsg: `刪除筆數${result.deletedCount}筆！`,
            });
        });
});


module.exports = app;