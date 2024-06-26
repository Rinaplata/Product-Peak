const express = require("express");
const { connectDB } = require("./database/db");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
const swaggerjsdoc = require("swagger-jsdoc");
const app = express();

// se usa para leer el archivo .env
const dotenv = require("dotenv");
dotenv.config();
const PORT = Number.parseInt(process.env.PORT || "3000");

// DB

connectDB();

// Parsing body payload
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerjsdoc(swaggerOptions), { explorer: true })
);
// app routes
app.use("/api/v1", require("./routes/UserRoutes"));
app.use("/api/v1", require("./routes/CommentRoutes"));
app.use("/api/v1", require("./routes/RatingRoutes"));
app.use("/api/v1/products", require("./routes/ProductRoutes"));

app.listen(PORT, () => {
  console.log(`SERVER RUNNING`);
});
