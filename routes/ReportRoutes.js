const express = require("express");
const { createReport, getAllReports, getReportDetails, updateReport, deleteReport } = require("../controllers/ReportControllers");
const { test } = require("../controllers/test");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router()

router
.route("/")
// .post(isAuthenticatedUser, createReport)
// .get(getAllReports)
.get(test)

// router
// .route("/report/:id")
// .get(isAuthenticatedUser, getReportDetails)
// .put(isAuthenticatedUser, updateReport)
// .delete(isAuthenticatedUser, deleteReport)

module.exports = router;