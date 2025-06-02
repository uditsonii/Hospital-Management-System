const express = require('express');
const {registerUser, loginUser, doctorRegistration, loginManagement,login,logout,updatePatientProfile,bookAppointment} = require('../controllers/authController')

const authRoute = express.Router();

//patient
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.put('/profile/:id',updatePatientProfile)
authRoute.post('/book-appointments',bookAppointment)
//doctor
// authRoute.post('/doctor/register', doctorRegistration);

module.exports = authRoute;