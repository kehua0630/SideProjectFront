// console.log('hello world!!')
// run node server.js

// ------------------------------------------------
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.end('response!!');
// });
// server.listen(process.env.PORT || 3000);
// run node server.js
// open localhost:3000 in browser

// -------------------------------------------------
// const http = require('http');
// const app = require('./backend/app');

// const port = process.env.PORT || 3000;
// app.set('port', port);
// const server = http.createServer(app);
// server.listen(port);
// connect app.js to server

// CNuLWQPIcZ068d5G

// --------------------------------------------------
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const { MongoClient } = require('mongodb');

const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

 // npm install --save express
 // add express to project

 // npm install --save-dev nodemon
 // add "start:server": "nodemon server.js" in package.json
 // npm run start:server
 // it will automatically restart server.js when code changes

 // npm install --save body-parser

