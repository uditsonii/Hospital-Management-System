const express = require("express");
const doctorRoutes = express.Router();
const doctorController = require("../controllers/doctorController");
const DoctorController=require(".././controllers/admincontroller/DoctorController")
const authMiddleware = require("../middleware/authMiddleware"); // Your JWT middleware

// Protected Doctor Routes
// doctorRoutes.use(authMiddleware); // Ensure all are JWT-protected

doctorRoutes.get("/appointments", doctorController.getDoctorAppointments);
doctorRoutes.patch("/appointments/:id/status", doctorController.updateAppointmentStatus);
doctorRoutes.get("/patients", doctorController.getMyPatients);
doctorRoutes.post("/diagnosis", doctorController.addDiagnosis);
doctorRoutes.get("/profile", doctorController.getDoctorProfile);
doctorRoutes.put("/profile", doctorController.updateDoctorProfile);

// crud
doctorRoutes.post("/", createDoctor)  //create
doctorRoutes.get("/fetchdoctor", getAllDoctor)  //read all
doctorRoutes.get("/:id", getDoctorById)  //read one
doctorRoutes.put("/:id", updateDoctor)  //update
doctorRoutes.delete("/:id", deleteDoctor)  //delete

module.exports = doctorRoutes;
