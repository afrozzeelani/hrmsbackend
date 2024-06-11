const router = require("express").Router();
// const userController = require("../controllers/employeeController");
const teamController = require("../controllers/team-controller");
const upload = require("../services/file-upload-service");

router.post("/team", upload.single("image"), teamController.createTeam); // Create Team
router.patch("/team/:id", upload.single("image"), teamController.updateTeam); // Update Team
router.get("/teams", teamController.getTeams); // Teams
router.get("/team/:id", teamController.getTeam); // Team
router.get("/team/:id/members", teamController.getTeamMembers); // Team Members
router.patch("/team/member/add", teamController.addMember); // Add Team Member
router.patch("/team/member/remove", teamController.removeMember); // Remove Team Member
router.patch("/team/leader/add", teamController.addRemoveLeader); // Add Team Leader
router.patch("/team/leader/remove", teamController.addRemoveLeader); // Remove Team Leader
router.get("/counts", teamController.getCounts); // Counts

module.exports = router;
