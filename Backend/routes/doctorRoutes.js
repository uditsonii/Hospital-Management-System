const express = require("express");
const doctorRoutes = express.Router();
const doctorController = require("../controllers/doctorController");
const verifyToken = require("../middleware/authMiddleware"); // Your JWT middleware

// Protect all doctor routes
doctorRoutes.use(verifyToken);

doctorRoutes.get("/appointments", doctorController.getDoctorAppointments);
doctorRoutes.patch("/appointments/:id/status", doctorController.updateAppointmentStatus);
doctorRoutes.get("/patients", doctorController.getMyPatients);
doctorRoutes.post("/diagnosis", doctorController.addDiagnosis);
doctorRoutes.get("/profile", doctorController.getDoctorProfile);

module.exports = doctorRoutes;
