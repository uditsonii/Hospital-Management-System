const bcrypt = require("bcrypt");
const { getDB } = require("../models/db");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const db = () => getDB();

// //patient
// const registerUser = async (req, res) => {
//   // const db = getDB();

//   const { name, gender, age, mobile_no, gname, password } = req.body;

//   if (!name || !gender || !password || !mobile_no || !age || !gname) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   // validate gender
//   const allowedGenders = ["male", "female", "other"];
//   if (!allowedGenders.includes(gender.toLowerCase())) {
//     return res
//       .status(400)
//       .send("Invalid gender. Must be male, female, or other");
//   }

//   // validate age
//   const parseAge = parseInt(age);
//   if (isNaN(parseAge) || parseAge < 0) {
//     return res.status(400).send("Age must be a valid number");
//   }

//   // validate mobile_no.
//   const mobileStr = mobile_no.toString();
//   if (mobileStr.length != 10 || isNaN(mobileStr)) {
//     return res.status(400).send("Mobile number must be 10 digits");
//   }

//   try {
//     //check user already exists
//     // const userExist = await db
//     //   .collection("register")
//     //   .findOne({ name, mobile_no });
//     const userExist = await db().findOne({ name, mobile_no, gender });
//     if (userExist) {
//       return res.status(400).json({ message: "User Already exists" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     //insert new user
//     const result = await db().insertOne({
//       name,
//       gender: gender.toLowerCase(),
//       age: parseAge,
//       mobile_no: mobileStr,
//       gname,
//       password: hashPassword,
//       role: "patient",
//       createdAt: new Date(),
//     });

//     res
//       .status(201)
//       .send({ success: true, message: "User Register Successfully", result });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: err.message,
//     });
//   }
// };

// Login for all Roles(patient, doctor, admin, opd)
const login = async (req, res) => {
  const { name, mobile_no, password } = req.body;

  try {
    const roleWithMobile = ["patient", "doctor"];
    const roleWithoutMobile = ["admin", "opd"];
    const allRoles = [...roleWithMobile, ...roleWithoutMobile];

    let user;

    if (name) {
      user = await db().collection("management-registration").findOne({ name });
      // console.log("user value :", user);
      if (user) {
        if (user.role === "doctor") {
          if (roleWithMobile.includes(user.role) && !mobile_no) {
            return res
              .status(400)
              .json({ message: "Mobile number is required" });
          }
        } else {
          if (roleWithoutMobile.includes(user.role) && mobile_no) {
            return res
              .status(400)
              .json({ message: "Mobile number is not required" });
          }
        }
      } else {
        user = await db().collection("patient-registration").findOne({ name });
        if (user) {
          console.log(user.role);
          if (roleWithMobile.includes(user.role) && !mobile_no) {
            return res
              .status(400)
              .json({ message: "Mobile number is required" });
          }
        }
      }
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });

    const roleMessages = {
      admin: "Admin Login Successfully",
      opd: "OPD Management Login Successfully",
      doctor: "Doctor Login Successfully",
      patient: "Login Successfully",
    };
    return res.status(200).json({
      message: roleMessages[user.role],
      token,
      user,
    });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
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

    const result = await db
      .collection("patient-registration")
      .updateOne({ _id: id }, { $set: updateFields });

    console.log("🧾 MongoDB Result:", result);

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or data unchanged" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// logout
const logout = (req, res) => {
  // nothing to be do because we use jwt not session
  res.status(200).json({ message: "Logged Out Successfully" });
};

// for book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { name, doctor, date, purpose } = req.body;
    if (!name || !doctor || !date) {
      return res.status(400).send({
        status: 400,
        message: "Please provide all information to proceed ",
      });
    }
    let db = await getDB();
    let collection = db.collection("appointments");
    let result = await collection.insertOne({
      name,
      doctor,
      date,
      purpose,
      createdAt: new Date(),
    });
    if (!result.acknowledged) {
      console.log("problem while booking appointment in db");
      return res.status(500).send({
        status: 500,
        message: "appointement data not stored due to internal server error",
        insertId: result.insertedId,
      });
    }
    return res.status(200).send({
      status: 200,
      message: "appointment booked Successfully",
      appointmentId: result.insertedId,
    });
  } catch (error) {
    console.log(
      "error catched while booking appointment to db in authController.js line 325"
    );
    return res.status(500).send({
      status: 500,
      message: "Internal server error while booking appointment",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  updatePatientProfile,
  logout,
  bookAppointment,
};
