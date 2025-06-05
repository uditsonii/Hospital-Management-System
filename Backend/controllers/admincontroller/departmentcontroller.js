const { ObjectId } = require('mongodb');
const { getDB } = require('../../models/db');

// CREATE
const createDepartment = async (req, res) => {
  try {
    const { name, head, description } = req.body;

    if (!name || !head || !description) {
      return res.status(400).json({ error: 'All fields (name, head, description) are required.' });
    }

    const db = getDB();

    // Get latest deptid from existing departments
    const latestDept = await db.collection('departments')
      .find()
      .sort({ deptid: -1 }) // Sort by deptid descending (string)
      .limit(1)
      .toArray();

    let newDeptId = '01'; // Default deptid
    if (latestDept.length > 0) {
      const latestId = parseInt(latestDept[0].deptid, 10);
      newDeptId = (latestId + 1).toString().padStart(2, '0');
    }

    const department = { deptid: newDeptId, name, head, description };
    const result = await db.collection('departments').insertOne(department);
    const createdDept = await db.collection('departments').findOne({ _id: result.insertedId });

    res.status(201).json(createdDept);
  } catch (err) {
    console.error("❌ Error in createDepartment:", err);
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
const getAllDepartments = async (req, res) => {
  try {
    const db = getDB();
    const departments = await db.collection('departments').find().sort({ deptid: 1 }).toArray();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE by MongoDB _id
const getDepartmentById = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid department id' });
    }

    const department = await db.collection('departments').findOne({ _id: new ObjectId(id) });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE by MongoDB _id
const updateDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, head, description } = req.body;
    console.log("Update called with ID:", id);
    console.log("Body:", req.body);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid department id' });
    }
    if (!name || !head || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const db = getDB();

    const result = await db.collection('departments').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name, head, description } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.status(200).json({ department: result.value });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE by MongoDB _id
const deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid department id' });
    }

    const db = getDB();
    const result = await db.collection('departments').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
