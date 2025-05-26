const express = require('express');
const {registerUser, loginUser, doctorRegistration, loginManagement, bookAppointment} = require('../controllers/authController')

const authRoute = express.Router();

//patient
authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/login/admin', loginManagement)
authRoute.post('/bookappointment', bookAppointment)

//doctor
authRoute.post('/doctor/register', doctorRegistration);

module.exports = authRoute;