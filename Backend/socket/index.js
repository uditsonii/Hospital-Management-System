// socket.js
let ioInstance = null;

const initSocket=(server)=> {
  const io = server
  ioInstance=io

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
}

const emitNewAppointment=(appointmentData)=> {
  if (ioInstance) {
    ioInstance.emit("new_appointment", appointmentData);
  }
}

module.exports = { initSocket, emitNewAppointment };
