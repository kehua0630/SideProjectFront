const express = require("express");
const loginRouter = express.Router();

const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const Account = require("../models/account");

loginRouter.post("", (req, res, next) => {
  Account.findOne({ userName: req.body.userName })
    .then((user) => {
      console.log('user exist!')
      if (!user) {
        res.status(401).json({
          RetCode: "90",
          RetMsg: "找不到名稱！",
          RetResult: "",
        });
      } else {
        // hash無法反解, 可把密碼hash做比對
        bcrypt.compare(req.body.pwd, user.pwd)
          .then((result) => {
            console.log('compare pwd::', result)
            if (!result) {
              res.status(401).json({
                RetCode: "90",
                RetMsg: "密碼錯誤！",
                RetResult: "",
              });
            } else {
              console.log('pwd correct!')
              const jwt = jsonwebtoken.sign(
                {
                  userName: user.userName,
                  id: user._id,
                },
                "PTJIzIet482yI7r1vvDP",
                {
                  expiresIn: "1h",
                }
              );

              res.status(200).json({
                RetCode: "00",
                RetMsg: "登入成功！",
                RetResult: {
                  jwt: jwt,
                  user: user,
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(401).json({
              RetCode: "90",
              RetMsg: "登入錯誤！",
              RetResult: "",
            });
          });
      }

    })

});

module.exports = loginRouter;
