const bcrypt = require("bcrypt");
const { getDB } = require("../models/db");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
require("dotenv").config();



const db = () => getDB().collection("register");

//patient
const registerUser = async (req, res) => {
  // const db = getDB();

  const { name, gender, age, mobile_no, gname, password } = req.body;

  if (!name || !gender || !password || !mobile_no || !age || !gname) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // validate gender
  const allowedGenders = ["male", "female", "other"];
  if (!allowedGenders.includes(gender.toLowerCase())) {
    return res
      .status(400)
      .send("Invalid gender. Must be male, female, or other");
  }

  // validate age
  const parseAge = parseInt(age);
  if (isNaN(parseAge) || parseAge < 0) {
    return res.status(400).send("Age must be a valid number");
  }

  // validate mobile_no.
  const mobileStr = mobile_no.toString();
  if (mobileStr.length != 10 || isNaN(mobileStr)) {
    return res.status(400).send("Mobile number must be 10 digits");
  }

  try {
    //check user already exists
    // const userExist = await db
    //   .collection("register")
    //   .findOne({ name, mobile_no });
    const userExist = await db().findOne({ name, mobile_no });
    if (userExist) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    //insert new user
    const result = await db().insertOne({
      name,
      gender: gender.toLowerCase(),
      age: parseAge,
      mobile_no: mobileStr,
      gname,
      password: hashPassword,
      role: "patient",
      createdAt: new Date(),
    });

    res
      .status(201)
      .send({ success: true, message: "User Register Successfully", result });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: err.message,
    });
  }
};
// doctor + user or patient
const loginUser = async (req, res) => {
  // const db = getDB();

  const { name, mobile_no, password } = req.body;

  const user = await db().findOne({ name, mobile_no });
  if (user.role === "patient") {
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      const option = {
        expiresIn: "1d",
      };
      const token = jwt.sign(user, process.env.JWT_SECRET, option);

      return res.send({
        status: 200,
        message: "Login Successfully",
        user,
        token: token,
      });
    }
  } else if (user.role === "doctor") {
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }

      const option = {
        expiresIn: "1d",
      };
      const token = jwt.sign(user, process.env.JWT_SECRET, option);

      return res.send({
        status: 200,
        message: "Doctor Login Successfully",
        token: token,
        user
      });
    }
  }
  else {
    return res.status(401).json({ message: "Access Denied , Invalid Role" });
  }
};

const loginManagement = async (req, res) => {
  const { name, password } = req.body;

  const user = await db().findOne({ name });
  if (user.role === "admin") {
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      const option = {
        expiresIn: "1d",
      };
      const token = jwt.sign(user, process.env.JWT_SECRET, option);

      return res.send({
        status: 200,
        message: "Admin Login Successfully",
        token: token,
      });
    }
  } else if (user.role === "opd") {
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }

      const option = {
        expiresIn: "1d",
      };
      const token = jwt.sign(user, process.env.JWT_SECRET, option);

      return res.send({
        status: 200,
        message: "OPD Management Login Successfully",
        token: token,
      });
    }
  }
  else {
    return res.status(401).json({ message: "Access Denied , Invalid Role" });
  }
}

//doctor
const doctorRegistration = async (req, res) => {
  const { name, gender, age, mobile_no, degree, password } = req.body;

  if (!name || !gender || !age || !mobile_no || !degree || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  //validation
  const allowedGenders = ["male", "female", "other"];
  if (!allowedGenders.includes(gender.toLowerCase())) {
    return res
      .status(400)
      .send("Invalid gender. Must be male, female, or other");
  }

  const parseAge = parseInt(age);
  if (isNaN(parseAge) && parseAge < 0) {
    return res.status(400).send("Age must be a valid number");
  }

  const mobileStr = mobile_no.toString();
  if (mobileStr.length != 10 || isNaN(mobileStr)) {
    return res.status(400).send("Mobile number must be 10 digits");
  }

  try {
    const doctorExist = await db().findOne({ name, mobile_no });
    if (doctorExist) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const register = await db().insertOne({
      name,
      gender: gender.toLowerCase(),
      age: parseAge,
      mobile_no: mobileStr,
      password: hashPassword,
      role: "doctor",
      degree,
      createdAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: "Doctor Register Successfully",
      register,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: err.message,
    });
  }
};

// const doctorLogin = async (req, res) => {
//   const { name, mobile_no, password } = req.body;

//   const doctor = await db().find({ name, mobile_no });
//   if (!doctor) {
//     return res.status(404).json({ message: "User Not Found" });
//   } else {
//     const isMatch = await bcrypt.compare(password, doctor.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         message: "Invalid Credentials",
//       });
//     }

//     const option = {
//       expiresIn: "1d",
//     };
//     const token = jwt.sign(doctor, process.env.JWT_SECRET, option);

//     return res.send({
//       status: 200,
//       message: "Login Successfully",
//       token: token,
//     });
//   }
// };

//check jwt work properly
const checkJWT = async (req, res) => {
  res.json({ message: "Your profile", user: req.user, status: 200 });
};

//admin login
const roleAdmin = async (req, res) => {
  if (req.user && req.user.role === "admin") {
    res.json({ message: "Welcome Admin", user: req.user, status: 200 });
  } else {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }
};

// opd login
const roleOPD = async (req, res) => {
  if (req.user && req.user.role === "opd") {
    res.json({ message: "Welcome OPD", user: req.user, status: 200 });
  } else {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }
};

const updatePatientProfile = async (req, res) => {
  const db = getDB();
  const userId = req.params.id;

  try {
    console.log("✅ Received ID:", userId);
    const id = new ObjectId(userId);
    console.log("🔍 Parsed ObjectId:", id);
    const updateFields = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      mobile_no: req.body.mobile_no,
      gname: req.body.gname,
    };

    // Only hash and include password if it's provided
    if (req.body.password && req.body.password.trim() !== "") {
      console.log("🔐 Hashing new password...");
      updateFields.password = await bcrypt.hash(req.body.password, 10);
    }

    console.log("🛠️ Fields to Update:", updateFields);

    const result = await db.collection("register").updateOne(
      { _id: id },
      { $set: updateFields }
    );

    console.log("🧾 MongoDB Result:", result);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found or data unchanged" });
    }

    res.status(200).json({ message: "Profile updated successfully" });

  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



const bookAppointment = async (req, res) => {
  try {
    const { name, doctor, date, purpose } = req.body
    if (!name || !doctor || !date) {
      return res.status(400).send({
        status: 400,
        message: "Please provide all information to proceed "
      })
    }
    let db = await getDB();
    let collection = db.collection('appointments')
    let result =await collection.insertOne({
      name,
      doctor,
      date,
      purpose,
       createdAt: new Date()
    })
if(!result.acknowledged){
  console.log("problem while booking appointment in db")
  return res.status(500).send({
    status:500,
    message:"appointement data not stored due to internal server error",
    insertId:result.insertedId,
  })
}
return res.status(200).send({
  status:200,
  message:"appointment booked Successfully",
  appointmentId:result.insertedId,
})

  } catch (error) {
    console.log("error catched while booking appointment to db in authController.js line 325")
    return res.status(500).send({
      status: 500,
      message: "Internal server error while booking appointment",
      error: error.message
    });
  }
}
module.exports = {
  registerUser,
  loginUser,
  loginManagement,
  doctorRegistration,
  checkJWT,
  roleAdmin,
  roleOPD,
};
