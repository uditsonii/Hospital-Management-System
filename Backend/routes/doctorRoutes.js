const express = require("express");
const doctorRoutes = express.Router();
const doctorController = require("../controllers/doctorController");
// const authMiddleware = require("../middlewares/auth"); // Your JWT middleware

// Protected Doctor Routes
// doctorRoutes.use(authMiddleware); // Ensure all are JWT-protected

doctorRoutes.get("/appointments", doctorController.getDoctorAppointments);
doctorRoutes.patch("/appointments/:id/status", doctorController.updateAppointmentStatus);
doctorRoutes.get("/patients", doctorController.getMyPatients);
doctorRoutes.post("/diagnosis", doctorController.addDiagnosis);
doctorRoutes.get("/profile", doctorController.getDoctorProfile);

module.exports = doctorRoutes;
