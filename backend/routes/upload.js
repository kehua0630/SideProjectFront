const express = require("express");
const uploadRouter = express.Router();

const checkAuth = require("../middleware/check-auth");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'backend/upload-files');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

uploadRouter.post("", multer({ storage: storage }).single("file"), uploadSingle);

function uploadSingle(req, res) {
    console.log("req file", req.file)
    console.log("res", res)
    res.json({
        RetCode: "00",
        RetMsg: "上傳成功！",
        RetResult: req.file,
      })
  }

module.exports = uploadRouter;
