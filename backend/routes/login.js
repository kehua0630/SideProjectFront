const express = require('express');
const loginRouter = express.Router();

const Account = require('../models/account')

loginRouter.post("", (req, res, next) => {
    Account.findOne({ userName: req.body.userName })
        .then(user => {
            if (!user) {
                res.status(401).json(
                    {
                        RetCode: '90',
                        RetMsg: '找不到名稱！',
                        RetResult: '',
                    }
                )
            }
        })

})

module.exports = loginRouter;