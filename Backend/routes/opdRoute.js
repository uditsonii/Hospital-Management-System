const express = require("express");
const { NewPatient, OPDRegister, SendDetailThroughPID, getPendingRequests, bookAppointmentFromUser, updateAppointmentStatus } = require("../controllers/PatientAppointmentController");

const opdRoutes = express.Router();

opdRoutes.post("/register-new-patient", NewPatient);
opdRoutes.post("/fill-slip", OPDRegister);

// send patient data through pid
opdRoutes.get("/patient-pid/:pid", SendDetailThroughPID);

//user books appointement
opdRoutes.post('/book-appointments',bookAppointmentFromUser)
opdRoutes.post('/get-pending-requests',getPendingRequests)
opdRoutes.patch('/update-appointment-status',updateAppointmentStatus)


module.exports = opdRoutes;