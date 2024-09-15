const jsonwebtoken = require("jsonwebtoken");


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jsonwebtoken.verify(token, "PTJIzIet482yI7r1vvDP");
        next();
    } catch {
        res.status(401).json({
            RetCode: "90",
            RetMsg: "權限錯誤，請重新登入！",
            RetResult: "",
        })
    }

};