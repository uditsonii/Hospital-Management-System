const { MongoClient } = require("mongodb");
require("dotenv").config();

//connet database
const client = new MongoClient(process.env.MONGO_URI);
const dbname = "hospital_management_system";
let db;

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connect to Mongodb Altas");
    db = client.db(dbname);
  } catch (error) {
    console.error("MongoDB connection error: ", error);
  }
};

const getDB = () => {
  if (!db) throw new Error("❌ Database not connected!");
  return db;
};

module.exports = { connectDB, getDB };
