const { ObjectId, ReturnDocument } = require("mongodb");
const bcrypt = require("bcrypt");
const { getDB } = require("../../models/db");

const db = () => getDB();

// Create Doctor
const createDoctor = async (req, res) => {
  const {
    deptid,
    name,
    mobile_no,
    dob,
    gender,
    email,
    specialization,
    degree,
    experience,
  } = req.body;

  if (!name || !mobile_no || !gender || !specialization ||!degree || !deptid) {
    return res.status(400).json({ message: "All Fields are Required " });
  }

  try {
    // Validate Department Exists
    const departmentExists = await db()
      .collection("departments")
      .findOne({ deptid });
    if (!departmentExists) {
      return res.status(400).json({ message: "Department Not Found" });
    }

    // Check doctor exists
    const doctorExists = await db()
      .collection("management-registration")
      .findOne({ name, mobile_no });
    if (doctorExists) {
      return res.status(409).json({ message: "Doctor Already Exists" });
    }

    const hashPassword = await bcrypt.hash(`JH@${name}`, 10);

    const result = await db()
      .collection("management-registration")
      .insertOne({
        deptid,
        name,
        mobile_no,
        gender,
        role: "doctor",
        password: hashPassword,
        specialization,
        degree,
        dob: dob || "",
        email: email || "",
        experience: experience || "",
        createdAt: new Date(),
      });
    const createdDoctor = await db()
      .collection("management-registration")
      .findOne({ _id: result.insertedId });
    return res.status(201).json(createdDoctor);
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
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Doctor id" });
    }

    const doctor = await db()
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
  const { id } = req.params;
  const fields = req.body;

  if (
    !fields.name ||
    !fields.mobile_no ||
    !fields.gender ||
    !fields.specialization ||
    !fields.degree ||
    !fields.deptid
  ) {
    return res.status(400).json({ message: "All Fields are Required" });
  }
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Doctor ID" });
  }
  try {

    //validate Department
    const departmentExists = await db()
      .collection("departments")
      .findOne({ deptid: fields.deptid });
    if (!departmentExists) {
      return res.status(404).json({ message: "Department Not Found" });
    }
    // console.log(id);

    const result = await db()
      .collection("management-registration")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...fields,
            updatedAt: new Date(),
          },
        },
        { returnDocument: "after" }
      );
      // console.log("result", result)
    if (!result) {
      return res.status(404).json({ message: "Doctor not Found" });
    }
    return res
      .status(200)
      .json({ message: "Doctor Updated Successfully", doctor: result });
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

//  Delete
const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Doctor id" });
    }
    const result = await db()
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
