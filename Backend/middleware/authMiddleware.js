// const jwt = require("jsonwebtoken");
// require('dotenv').config();

// const verifyToken = (req, res, next) => {
//     const token = req.body.token;
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. Token missing.' });
//     }

//     try {
//         const decorded = jwt.verify(token, process.env.JWT_SECRET);
//         // return { valid: true, decorded };       
//         req.user = decorded; // it gives the data in the request 
//         next();
//     } catch (err) {
//         return { valid: false, error: err.message };
//     }
// }

// module.exports = verifyToken;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Bearer tokenstring
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // get token part
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // attach decoded user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
