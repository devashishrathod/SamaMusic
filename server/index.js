require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const { mongoDb } = require("./database/mongoDb");
const { errorHandler } = require("./middlewares");
const { throwError } = require("./utils");
const allRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(morgan("dev"));
app.use("/sama-music/", allRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Sama Songs 🎶🚀");
});
app.use((req, res, next) => {
  throwError(404, "Invalid API");
});
app.use(errorHandler);

mongoDb();
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
