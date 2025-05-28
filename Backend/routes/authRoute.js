const express = require('express');
const {registerUser, loginUser, doctorRegistration, loginManagement} = require('../controllers/authController')

const authRoute = express.Router();

//patient
authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/login/admin', loginManagement)

//doctor
authRoute.post('/doctor/register', doctorRegistration);

module.exports = authRoute;