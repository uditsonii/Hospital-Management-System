const express = require("express");
const { NewPatient, OPDRegister, SendDetailThroughPID } = require("../controllers/PatientAppointmentController");

const opdRoutes = express.Router();

opdRoutes.post("/register-new-patient", NewPatient);
opdRoutes.post("/fill-slip", OPDRegister);

// send patient data through pid
opdRoutes.get("/patient-pid/:pid", SendDetailThroughPID);

module.exports = opdRoutes;