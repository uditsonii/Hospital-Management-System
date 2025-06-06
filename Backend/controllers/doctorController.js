const { getDB } = require("../models/db");
const { ObjectId } = require("mongodb");

// Get all visits assigned to this doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorName = req.user.name; // JWT verified name
    const db = getDB();
    const visits = await db.collection("visits").find({ doctor: doctorName }).toArray();
    return res.status(200).json({ success: true, appointments: visits });
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

    const visits = await db.collection("visits").find({ doctor: doctorName }).toArray();
    const patientNames = [...new Set(visits.map(v => v.name))];

    const patients = await db.collection("patient-registration").find({
      name: { $in: patientNames },
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

module.exports = {
  getDoctorAppointments,
  updateAppointmentStatus,
  getMyPatients,
  addDiagnosis,
  getDoctorProfile,
};
