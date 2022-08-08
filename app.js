const express = require('express')
const errorMiddleware = require("./middleware/error")
const dotenv = require("dotenv")
const app = express();
const path = require("path")
const bodyParser = require("body-parser")
// const fileUpload = require("express-fileUpload")
const cookieParser = require("cookie-parser")
var cors = require('cors');

app.use(express.json())
app.use(cookieParser())
app.use(cors());
// app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config({ path: "config/config.env" })

const reports = require("./routes/ReportRoutes")
app.use("/", reports)

const users = require("./routes/UserRoutes")
app.use("/", users)

const treats = require("./routes/TreatRoutes")
app.use("/", treats)

// error middleware

app.use(errorMiddleware)

module.exports = app