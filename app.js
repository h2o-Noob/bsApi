const express = require('express')
const errorMiddleware = require("./middleware/error")
const dotenv = require("dotenv")
const app = express();
const path = require("path")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
var cors = require('cors');

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config({ path: "config/config.env" })

// report route
const reports = require("./routes/ReportRoutes")
app.use("/api", reports)

// user route
const users = require("./routes/UserRoutes")
app.use("/api", users)

// treat route
const treats = require("./routes/TreatRoutes")
app.use("/api", treats)

// payment route
const payment = require("./routes/PaymentRoutes");
app.use("/api", payment);

// error middleware

app.use(errorMiddleware)

module.exports = app