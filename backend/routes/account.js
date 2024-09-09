const express = require('express');
const accountRouter = express.Router();

const Account = require('../models/account')

accountRouter.post('', (req, res, next) => {
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

accountRouter.get("", (req, res, next) => {
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

accountRouter.get("/:id", (req, res, next) => {
    console.log('put req ID::', req.params.id);
    Account.findById(req.params.id)
        .then(account => {
            if (account) {
                console.log(result);
                res.status(200).json({
                    RetCode: '00',
                    RetMsg: '',
                    RetResult: account,
                });
            } else {
                res.status(404).json({
                    RetCode: '00',
                    RetMsg: '',
                    RetResult: '找不到資料!',
                });
            }

        })
});

accountRouter.put("/:id", (req, res, next) => {
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

accountRouter.delete("/:id", (req, res, next) => {
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

module.exports = accountRouter;