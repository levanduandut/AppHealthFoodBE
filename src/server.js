import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";

// const { Storage } = require('@google-cloud/storage');
// const path = require("path");
// const gc = new Storage({
//     keyFilename: path.join(__dirname, "./fiery-atlas-388115-cbec4b777bcb.json"),
//     projectId:'fiery-atlas-388115',
// })
// gc.getBuckets().then(x => console.log(x));
// const fileBuckket = gc.bucket('healthfood-do');
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Xử lý lỗi ở đây
    // Ví dụ: ghi log, thông báo, hoặc thực hiện các tác vụ khác
});

// import cors from "cors"
require("dotenv").config();

let app = express();
// app.use(cors({origin:true}))
//config app
// let cors = require('cors');    
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Add headers before the routes are defined
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log(
        "Backend Nodejs is runing on the port : http://localhost:" + port
    );
});
