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

    // Increment the counter or create it if not exists
    const counter = await db.collection('counters').findOneAndUpdate(
      { _id: "departmentId" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true }
    );

    // If for some reason counter.value is null (very unlikely), set seq to 1
    const seq = counter.value?.seq || 1;

    // Pad with zeroes
    const dptId = seq.toString().padStart(2, '0');

    const department = { dptId, name, head, description };

    const result = await db.collection('departments').insertOne(department);
    const createdDept = await db.collection('departments').findOne({ _id: result.insertedId });

    res.status(201).json(createdDept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
const getAllDepartments = async (req, res) => {
  try {
    const db = getDB();
    const departments = await db.collection('departments').find().toArray();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
const getDepartmentById = async (req, res) => {
  try {
    const db = getDB();
    const department = await db
      .collection('departments')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateDepartment = async (req, res) => {
  try {
    const { name, head, description } = req.body;

    // Basic validation
    if (!name || !head || !description) {
      return res.status(400).json({ error: 'All fields (name, head, description) are required.' });
    }

    const db = getDB();
    const result = await db.collection('departments').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, head, description } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteDepartment = async (req, res) => {
  try {
    const db = getDB();
    const result = await db
      .collection('departments')
      .deleteOne({ _id: new ObjectId(req.params.id) });

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
