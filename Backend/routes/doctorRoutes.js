const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const authMiddleware = require("../middlewares/auth"); // Your JWT middleware

// Protected Doctor Routes
router.use(authMiddleware); // Ensure all are JWT-protected

router.get("/appointments", doctorController.getDoctorAppointments);
router.patch("/appointments/:id/status", doctorController.updateAppointmentStatus);
router.get("/patients", doctorController.getMyPatients);
router.post("/diagnosis", doctorController.addDiagnosis);
router.get("/profile", doctorController.getDoctorProfile);

module.exports = router;
