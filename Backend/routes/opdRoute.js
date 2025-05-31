const express = require("express");
const { NewPatient, OPDRegister } = require("../controllers/PatientAppointmentController");

const opdRoutes = express.Router();

opdRoutes.post("/register", NewPatient);
opdRoutes.post("/opd-fill", OPDRegister);

module.exports = opdRoutes;