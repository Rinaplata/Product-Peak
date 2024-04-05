const mongoose = require("mongoose");

const DB_URI = `mongodb://localhost:27017/Product-Peak`;

const connectDB = () => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true
  });

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("Error de conexión a la base de datos:", err);
  });

  db.once("open", () => {
    console.log("Conexión exitosa a la base de datos");
  });

};

module.exports = connectDB;
