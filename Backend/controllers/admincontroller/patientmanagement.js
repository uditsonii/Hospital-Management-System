const { ObjectId } = require("mongodb");
const { getDB } = require("../../models/db");

const patientCollection = () => getDB().collection("patient-registration");

const addPatient = async (req, res) => {
  const { name, age, gender, contact, address } = req.body;
  if (!name || !age || !gender || !contact) {
    return res.status(400).json({ error: "All fields required" });
  }
  const result = await patientCollection().insertOne({ name, age, gender, contact, address });
  res.status(201).json(result);
};

const getPatients = async (req, res) => {
  const patients = await patientCollection().find().toArray();
  res.json(patients);
};

const getPatientById = async (req, res) => {
  const { id } = req.params;
  const patient = await patientCollection().findOne({ _id: new ObjectId(id) });
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  res.json(patient);
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await patientCollection().updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
  res.json(result);
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  const result = await patientCollection().deleteOne({ _id: new ObjectId(id) });
  res.json(result);
};

module.exports = { addPatient, getPatients, getPatientById, updatePatient, deletePatient };
