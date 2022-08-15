const express = require("express");
const { createReport, getAllReports, getReportDetails, updateReport, deleteReport, myReports } = require("../controllers/ReportControllers");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router()

router
.route("/reports")
.post(isAuthenticatedUser, createReport)
.get(getAllReports)

router
.route("/me/reports")
.get(isAuthenticatedUser, myReports)

router
.route("/report/:id")
.get(getReportDetails)
.put(isAuthenticatedUser, updateReport)
.delete(isAuthenticatedUser, deleteReport)

module.exports = router;