const express = require("express");
const doctorRoutes = express.Router();
const doctorController = require("../controllers/doctorController");
const { createDoctor, getAllDoctor, getDoctorById, updateDoctor, deleteDoctor } = require("../controllers/admincontroller/DoctorController");
const authMiddleware = require("../middleware/authMiddleware"); // Your JWT middleware

// Protected Doctor Routes
doctorRoutes.use(authMiddleware); // Ensure all are JWT-protected

doctorRoutes.get("/appointments", doctorController.getDoctorAppointments);
doctorRoutes.patch("/appointments/:id/status", doctorController.updateAppointmentStatus);
doctorRoutes.get("/patients", doctorController.getMyPatients);
doctorRoutes.post("/diagnosis", doctorController.addDiagnosis);
doctorRoutes.get("/profile", doctorController.getDoctorProfile);
doctorRoutes.put("/profile", doctorController.updateDoctorProfile);
// crud
doctorRoutes.post("/", createDoctor)  //create
doctorRoutes.get("/", getAllDoctor)  //create
doctorRoutes.get("/:id", getDoctorById)  //create
doctorRoutes.put("/:id", updateDoctor)  //create
doctorRoutes.delete("/:id", deleteDoctor)  //create

module.exports = doctorRoutes;
