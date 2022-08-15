const express = require("express")
const { createNewTreat, getSingleTreat, myTreats, allTreats, updateTreat, deletTreat, getReportTreats } = require("../controllers/TreatController")
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router()

router
.route("/treat/new")
.post(isAuthenticatedUser, createNewTreat)

router
.route("/treat/:id")
.get(isAuthenticatedUser, getSingleTreat)

router
.route("/treat/report/:id")
.get(isAuthenticatedUser, getReportTreats)

router
.route("/treats/me")
.get(isAuthenticatedUser, myTreats)

router
.route("/admin/treats")
.get(isAuthenticatedUser, authorizedRole("admin"), allTreats)

router
.route("/admin/treat/:id")
.put(isAuthenticatedUser, authorizedRole("admin"), updateTreat)
.delete(isAuthenticatedUser, authorizedRole("admin"), deletTreat)

module.exports = router;