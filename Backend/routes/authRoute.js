const express = require('express');
const { registerUser, login, logout, updatePatientProfile, bookAppointment } = require('../controllers/authController');


const authRoute = express.Router();

//patient
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.put('/profile/:id',updatePatientProfile)
authRoute.post('/book-appointments',bookAppointment)


// authRoute.post('/register', registerUser);
// authRoute.post('/login/admin', loginManagement);
// authRoute.post('/login/admin', loginManagement)
// authRoute.post('/bookappointment', bookAppointment);

//doctor
// authRoute.post('/doctor/register', doctorRegistration);

module.exports = authRoute;