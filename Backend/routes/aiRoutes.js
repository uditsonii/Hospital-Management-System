const express = require("express");
const router = express.Router();
const { handleMedicalChat } = require("../controllers/aiController");

router.post("/", handleMedicalChat);

module.exports = router;
