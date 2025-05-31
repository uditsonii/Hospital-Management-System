const { getDB } = require("../models/db");

const db = () => getDB();

const generatePid = () => {
  const now = new Date();

  const date = now.getDate().toString().padStart(2, 0);
  const month = now.getMonth().toString().padStart(2, 0);
  const year = now.getFullYear().toString().slice(-2);
  const datePart = date + month + year;
  //   console.log(datePart);
  const randomNo = Math.floor(1000 + Math.random() * 9000);

  return `JH/${datePart}/${randomNo}`;
};

const NewPatient = async (req, res) => {
  const pData = req.body;
  try {
    // Check for Existing Patient
    const existingPatient = await db().collection("register").findOne({
      name: pData.name,
      mobile_no: pData.mobile_no,
      gender: pData.gender,
    });
    if (existingPatient) {
      return res.status(404).json({
        message: "Patient Already Exist",
      });
    } else {
      const patient = {
        pid: generatePid(),
        name: pData.name,
        mobile_no: pData.mobile_no,
        age: pData.age,
        gender: pData.gender,
        password: `${pData.name}@1234`,
        createdAt: new Date(),
      };
      //  Add optional fields only if filled
      if (pData.email && pData.email.trim() !== "")
        patient.email = pData.email.trim();

      if (pData.address && pData.address.trim() !== "")
        patient.address = pData.address.trim();

      if (pData.gname && pData.gname.trim() !== "")
        patient.gname = pData.gname.trim();

      if (pData.bloodGroup) patient.bloodGroup = pData.bloodGroup;

      const result = await db().collection("register").insertOne(patient);

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

const OPDRegister = async (req, res) => {
  const { pid, deptment, doctor, diagnosis, fee, referredBy } = req.body;

  if (!pid || !deptment || !doctor || !diagnosis || !fee) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });
  }

  try {
    // find patient by pid
    const patient = await db().collection("register").findOne({ pid });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found with pid" });
    }

    const visitData = {
      pid,
      patientId: patient._id,
      deptment,
      doctor,
      diagnosis,
      visitDate: new Date(),
      fee,
      referredBy: referredBy || null,
    };

    const result = await db().collection("visits").insertOne({ visitData });
    return res.status(200).json({
      success: true,
      message: "OPD Added",
      result: { ...visitData, slipId: result.insertedId },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = { NewPatient, OPDRegister };
