const { getDB } = require("../models/db");
const { ObjectId } = require("mongodb");

// Get all visits assigned to this doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorName = req.user?.name;
    if (!doctorName) {
      return res.status(400).json({ message: "Doctor name not found in token" });
    }

    const db = getDB();
    const visits = await db.collection("visits").find(
      { "visitData.doctor": doctorName },
      { projection: { 
          "visitData.pid": 1,
          "visitData.visitDate": 1,
          "visitData.diagnosis": 1,
          _id: 1
        } }
    ).toArray();

    const formattedVisits = visits.map(v => ({
      id: v._id,
      pid: v.visitData.pid,
      visitDate: v.visitData.visitDate,
      diagnosis: v.visitData.diagnosis || "N/A", // default to "N/A" if null/undefined
    }));

    return res.status(200).json({ success: true, appointments: formattedVisits });
  } catch (error) {
    console.error("Error fetching doctor visits:", error);
    return res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
  }
};


// Update status of a visit (e.g., completed/cancelled)
const updateAppointmentStatus = async (req, res) => {
  try {
    const db = getDB();
    const visitId = new ObjectId(req.params.id);
    const { status } = req.body;

    const result = await db.collection("visits").updateOne(
      { _id: visitId },
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Visit not found or already updated" });
    }

    res.status(200).json({ message: "Visit status updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// View all patients who have visits with this doctor
const getMyPatients = async (req, res) => {
  try {
    const db = getDB();
    const doctorName = req.user.name;

    const visits = await db.collection("visits").find({ "visitData.doctor": doctorName }).toArray();
    const patientIds = [...new Set(visits.map(v => v.visitData?.patientId))].filter(Boolean);

    const patients = await db.collection("patient-registration").find({
      _id: { $in: patientIds.map(id => new ObjectId(id)) },
      role: "patient"
    }).toArray();

    res.status(200).json({ patients });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch patients", error: error.message });
  }
};

// Add prescription or diagnosis notes
const addDiagnosis = async (req, res) => {
  try {
    const db = getDB();
    const { patientId, notes, prescription } = req.body;

    const result = await db.collection("diagnosis").insertOne({
      doctor: req.user.name,
      patientId,
      notes,
      prescription,
      date: new Date()
    });

    res.status(201).json({ message: "Diagnosis added", diagnosisId: result.insertedId });
  } catch (error) {
    return res.status(500).json({ message: "Error adding diagnosis", error: error.message });
  }
};

// View profile of the logged-in doctor
const getDoctorProfile = async (req, res) => {
  try {
    const db = getDB();
    const doctor = await db.collection("management-registration").findOne({ _id: new ObjectId(req.user._id) });

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ profile: doctor });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};
// Update logged-in doctor's profile
const updateDoctorProfile = async (req, res) => {
  try {
    const db = getDB();
    const doctorId = new ObjectId(req.user._id);
    const { name, email, gender, age, mobile_no, degree } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (gender) updateFields.gender = gender;
    if (age) updateFields.age = age;
    if (mobile_no) updateFields.mobile_no = mobile_no;
    if (degree) updateFields.degree = degree;

    const result = await db.collection("management-registration").updateOne(
      { _id: doctorId, role: "doctor" },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updatedDoctor = await db.collection("management-registration").findOne({ _id: doctorId });

    return res.status(200).json({ message: "Profile updated successfully", updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};


module.exports = {
  getDoctorAppointments,
  updateAppointmentStatus,
  getMyPatients,
  addDiagnosis,
  getDoctorProfile,
  updateDoctorProfile
};
