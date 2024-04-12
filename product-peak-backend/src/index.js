const express = require("express");
const { connectDB } = require("./database/db");

const app = express();

// se usa para leer el archivo .env
const dotenv = require("dotenv");
dotenv.config();

// DB

connectDB();

// Parsing body payload
app.use(express.json());

// app routes
app.use("/api/v1", require("./routes/UserRoutes"));
// routes product
app.use("/api/v1/products", require("./routes/ProductRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUNNING`);
});
