const express = require("express");
const personalInfoRoute = express.Router();

const {
  verifyEmployee,
  verifyHREmployee,
  verifyAdminHREmployee
} = require("../middleware/authMiddleware");

const {
  personalInfo,
  updatepersonalInfo
} = require("../controllers/personalInfoController");

// GET: Retrieve all personalInfo
personalInfoRoute.get(
  "/personal-info/:id",
  personalInfo
);

// PUT: Update an existing personalInfo
personalInfoRoute.put(
  "/personal-info/:id",
  updatepersonalInfo
);

module.exports = personalInfoRoute;
