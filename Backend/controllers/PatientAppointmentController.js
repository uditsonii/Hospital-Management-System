const { getDB, connectDB } = require("../models/db");
const bcrypt = require("bcrypt");
const { emitNewAppointment } = require("../socket/index.js");
const { ObjectId } = require("mongodb");
const db = () => getDB();

//Generate Random PId
const generatePid = () => {
  const now = new Date();

  const date = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString().slice(-2);
  const datePart = date + month + year;

  const timePart = now.getTime().toString().slice(-4);
  const randomNo = Math.floor(100 + Math.random() * 900);

  return `JH-${datePart}-${timePart}${randomNo}`;
};

//Register new Patient
const NewPatient = async (req, res) => {
  const pData = req.body;
  console.log(pData.name, pData.password, pData.mobile_no);
  if (!pData.name || !pData.mobile_no || !pData.age || !pData.gender) {
    return res
      .status(400)
      .json({ message: "Missing required patient details." });
  }
  try {
    // Check for Existing Patient
    const existingPatient = await db()
      .collection("patient-registration")
      .findOne({
        name: pData.name,
        mobile_no: pData.mobile_no,
        gender: pData.gender,
      });
    if (existingPatient) {
      return res.status(409).json({
        message: "Patient already exists",
      });
    } else {
      const passwordToHash =
        pData.password && pData.password.trim() !== ""
          ? pData.password
          : `${pData.name}@1234`;
      // 👇 Hash the password
      const hashedPassword = await bcrypt.hash(passwordToHash, 10);
      const patient = {
        pid: generatePid(),
        name: pData.name,
        age: pData.age,
        gender: pData.gender,
        mobile_no: pData.mobile_no,
        gname: pData.gname || "",
        email: pData.email || "",
        bloodGroup: pData.bloodGroup || "",
        address: pData.address || "",
        password: hashedPassword,
        role: "patient",
        createdAt: new Date(),
      };
      //  Add optional fields only if filled
      // if (pData.email && pData.email.trim() !== "")
      //   patient.email = pData.email.trim();

      // if (pData.address && pData.address.trim() !== "")
      //   patient.address = pData.address.trim();

      // if (pData.gname && pData.gname.trim() !== "")
      //   patient.gname = pData.gname.trim();

      // if (pData.bloodGroup) patient.bloodGroup = pData.bloodGroup;

      const result = await db()
        .collection("patient-registration")
        .insertOne(patient);

      return res.status(200).json({
        success: true,
        message: "Patient Register Successfully",
        patient: { ...patient, _id: result.insertedId },
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: error.message,
    });
  }
};

//Send Patient's Details to Frontent
const SendDetailThroughPID = async (req, res) => {
  const { pid } = req.params;
  //  console.log("PID : ",pid);

  try {
    const patient = await db()
      .collection("patient-registration")
      .findOne({ pid });
    if (!patient) {
      return res.status(404).json({ message: "Patient/slip not found" });
    }

    return res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const SendSlipDetails = async (req, res) => {
//   const { pid } = req.params;
//   // console.log(pid)

//   try {
//     const patient = await db().collection("patient-registration").findOne({ pid: pid });
//     const visit = await db()
//       .collection("visits")
//       .find({ pid: pid })
//       .sort({ _id: -1 }) // latest visit
//       .limit(1)
//       .toArray();

//     if (!patient || visit.length === 0) {
//       return res.status(404).json({ message: "Slip not found" });
//     }

//     const fullSlip = {
//       ...patient,
//       ...visit[0],
//     };

//     return res.json(fullSlip);
//   } catch (error) {
//     console.error("Error fetching slip:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// Fills Visits or Fills OPD

const SendSlipDetails = async (req, res) => {
  const { pid } = req.params;

  try {
    const patient = await db().collection("patient-registration").findOne({ pid });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const visit = await db()
      .collection("visits")
      .find({ pid })
      .sort({ _id: -1 }) // latest first
      .limit(1)
      .toArray();

    const visitData = visit[0] || {}; // may be empty for first-time patients

    const fullSlip = {
      ...patient,
      ...visitData,
    };

    return res.json(fullSlip);
  } catch (error) {
    console.error("Error fetching slip:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const OPDRegister = async (req, res) => {
  const { pid, department, doctor, diagnosis, fee, referredBy, visitType } =
    req.body;

  if (!pid || !department || !doctor || !fee) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });
  }

  try {
    // find patient by pid
    const patient = await db()
      .collection("patient-registration")
      .findOne({ pid });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found with pid" });
    }

    const visitData = {
      pid,
      patientId: patient._id,
      department,
      doctor,
      diagnosis: diagnosis || null,
      visitDate: new Date(),
      fee: fee || null,
      visitType: visitType || null,
      referredBy: referredBy || null,
    };

    const result = await db().collection("visits").insertOne(visitData);
    return res.status(200).json({
      success: true,
      message: "OPD Added",
      visitsDetails: { ...visitData, slipId: result.insertedId },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// opd search to find patient in registration collection
const searchPatientForOpd = async (req, res) => {
  try {
    const { query } = req.query;

    console.log(query);
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const result = await db()
      .collection("patient-registration")
      .find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { mobile_no: { $regex: query, $options: "i" } },
        ],
      })
      .toArray();
    console.log(result);

    if (result.length === 0) {
      return res.status(404).json({ message: "No Patients found" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log("Error in OPD search: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// for book Appointment from user
const bookAppointmentFromUser = async (req, res) => {
  try {
    const { name, pid, doctor, date, diagnosis, department } = req.body;
    if (!name || !pid || !doctor || !date || !department) {
      return res.status(400).send({
        status: 400,
        message: "Please provide all information to proceed",
      });
    }
    let db = await getDB();
    let collection = db.collection("appointments");
    let result = await collection.insertOne({
      name,
      pid,
      doctor,
      date,
      diagnosis: diagnosis || null,
      department,
      status: "pending",
      createdAt: new Date(),
    });

    if (!result.acknowledged) {
      return res.status(500).send({
        status: 500,
        message: "problem while booking appointement from user",
      });
    }

    // Fetch the actual saved appointment
    const savedAppointment = await collection.findOne({
      _id: result.insertedId,
    });

    // Emit the real saved DB document
    emitNewAppointment(savedAppointment);

    return res.status(200).send({
      status: 200,
      message: "appointment booked successfully",
      appointmentId: result.insertedId,
    });
  } catch (error) {
    console.log(
      "error catched while booking appointment to db in PatientAppointmentController.js"
    );
    return res.status(500).send({
      status: 500,
      message: "Internal server error while booking appointment",
      error: error.message,
    });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    let db = await getDB();
    let collection = db.collection("appointments");
    const result = await collection.find({ status: "pending" }).toArray();
    if (!result)
      res.status(401).json({
        status: 401,
        message: "problem while fetching pending requests",
      });

    res.status(200).json({
      status: 200,
      message: "successfully fetched pending requests",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error while fetching pending requests",
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(401).json({
        status: 401,
        message: "Provide appropriate ID and status to update the record",
      });
    }
    let db = await getDB();
    let collection = db.collection("appointments");
    const idToFind = new ObjectId(id);
    console.log("Converted ID:", idToFind);

    const result = await collection.updateOne(
      { _id: idToFind },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Appointment status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error while updating appointment status",
      error: error.message || error,
    });
  }
};
module.exports = {
  NewPatient,
  OPDRegister,
  searchPatientForOpd,
  SendDetailThroughPID,
  SendSlipDetails,
  bookAppointmentFromUser,
  getPendingRequests,
  updateAppointmentStatus,
};
