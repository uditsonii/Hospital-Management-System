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
doctorRoutes.post("/adddoctor", DoctorController.createDoctor)  //create
doctorRoutes.get("/", DoctorController.getAllDoctor)  //get all doctor
doctorRoutes.get("/:id",DoctorController. getDoctorById)  //get by ID for search
doctorRoutes.put("/:id",DoctorController. updateDoctor)  //update doctor
doctorRoutes.delete("/:id", DoctorController.deleteDoctor)  //delete doctor

module.exports = doctorRoutes;
