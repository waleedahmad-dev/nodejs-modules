const express = require("express");
const database = require("./config/database");
const cors = require("cors");
const app = express();
const path = require("path");
const routesV1 = require("./routes/v1.routes");
const welcome = require("./routes/welcome.routes");
// start database connection
database();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "../uploads")));
// Routes
app.use("/api/v1", routesV1);
app.use("/", welcome);
// export app

module.exports = app;
