const { ObjectId, ReturnDocument } = require("mongodb");
const { getDB } = require("../../models/db");

const db = () => getDB();

// Create Doctor
const createDoctor = async (req, res) => {
  const {
    name,
    mobile_no,
    dob,
    gender,
    email,
    speciality,
    experience,
    departmentId,
  } = req.body;

  if (!name || !mobile_no || !gender || !speciality || !departmentId) {
    return res.status(400).json({ message: "All Fields are Required " });
  }

  try {
    // Validate Department Exists
    const departmentExists = await db
      .collection("departments")
      .findOne({ _id: new ObjectId(departmentId) });
    if (!departmentExists) {
      return res.status(400).json({ message: "Department Not Found" });
    }

    // Check doctor exists
    const doctorExists = await db
      .collection("management-registration")
      .findOne({ name, mobile_no });
    if (doctorExists) {
      return res.status(409).json({ message: "Doctor Already Exists" });
    }

    const result = await db.collection("management-registration").insertOne({
      departmentId: new ObjectId(departmentId),
      name,
      mobile_no,
      gender,
      dob: dob || "",
      speciality,
      email: email || "",
      experience: experience || "",
    });

    return res.status(200).json({
      id: result.insertedId,
      result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", err: error.message });
  }
};

// Read All
const getAllDoctor = async (req, res) => {
  try {
    const doctors = await db()
      .collection("management-registration")
      .find({role:"doctor"})
      .toArray();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Read One
const getDoctorById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Doctor id" });
    }

    const doctor = await db
      .collection("management-registration")
      .findOne({ _id: new ObjectId(id) });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor Not Found" });
    }

    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update
const updateDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const { departmentId, ...fields } = req.body;
    const updateData = { ...fields };

    if (departmentId) {
      const dept = await db
        .collection("departments")
        .findOne({ _id: new ObjectId(departmentId) });
      if (!dept) {
        return res.status(404).json({ message: "Department Not Found" });
      }
      updateData.departmentId = new ObjectId(departmentId);
    }

    const result = await db
      .collection("management-registration")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { ReturnDocument: "after" }
      );
    if (!result.value) {
      return res.status(404).json({ message: "Doctor not Found" });
    }
    return res.status(200).json(result.value);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

//  Delete
const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Doctor id" });
    }
    const result = await db
      .collection("management-registration")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Doctor NOt Found" });
    }
    return res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createDoctor,
  getAllDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
