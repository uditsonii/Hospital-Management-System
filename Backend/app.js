const express = require("express");
const cors = require("cors");
const { connectDB } = require("./models/db.js");
const verifyToken = require("./middleware/authMiddleware.js");
const routes = require("./routes/checkJWT.js");
const authRoute = require("./routes/authRoute.js");
const opdRoutes = require("./routes/opdRoute.js");
const doctorRoutes = require("./routes/doctorRoutes.js");

const http = require("http");
const {Server}=require("socket.io")
const {initSocket}=require("./socket/index.js")


require("dotenv").config();

const app = express();
app.use(express.json()); //middelware
app.use(cors());

//crete a express app,create a http server, create a socket.io server
const server=http.createServer(app)
  const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
  });

//routes
app.use("/opd", opdRoutes) // opd panel routes

app.use("/", authRoute);
// app.use("/", verifyToken, routes);
app.use("/", routes);
app.use("/api/doctor", doctorRoutes); // doctor panel API
app.get("/test", (req, res) => res.send("Hospital Management"));

initSocket(io)
connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
