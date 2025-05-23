const express = require("express");
const cors = require("cors");
const { connectDB } = require("./models/db.js");
const verifyToken = require("./middleware/authMiddleware.js");
const routes = require("./routes/checkJWT.js");
const authRoute = require("./routes/authroute.js");

require("dotenv").config();

const app = express();
app.use(express.json()); //middelware
app.use(cors());

//routes
app.use("/", authRoute);
app.use("/", verifyToken, routes);

app.get("/", (req, res) => res.send("Hospital Management"));

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
