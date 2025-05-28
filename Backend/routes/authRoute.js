const express = require('express');
const {registerUser, loginUser, doctorRegistration, loginManagement,updatePatientProfile} = require('../controllers/authController')

const authRoute = express.Router();

//patient
authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/login/admin', loginManagement)
authRoute.put('/profile/:id',updatePatientProfile)

//doctor
authRoute.post('/doctor/register', doctorRegistration);

module.exports = authRoute;