const express = require("express");
const cors = require("cors");
//const morgan = require("morgan");
const  postRoutes  = require("./routes/post");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB Connection"));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})
// const myownmiddleware = (req, res, next) => {
//     console.log("ye mera middleware hai");
//     next();
// }

//middleware
// app.use(morgan("dev"));
// app.use(myownmiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/',postRoutes);

const port = process.env.Port || 3000;
app.listen(port, () => 
console.log(`app is listening at port no: ${port} `));
