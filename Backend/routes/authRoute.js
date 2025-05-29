const express = require('express');
const {registerUser, loginUser, doctorRegistration, loginManagement, logout,updatePatientProfile,bookAppointment} = require('../controllers/authController')

const authRoute = express.Router();

//patient
authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/login/admin', loginManagement)
authRoute.put('/profile/:id',updatePatientProfile)
authRoute.post('/book-appointments',bookAppointment)
authRoute.post('/login/admin', loginManagement);
authRoute.post('/logout', logout);
authRoute.post('/bookappointment', bookAppointment);

//doctor
authRoute.post('/doctor/register', doctorRegistration);

module.exports = authRoute;