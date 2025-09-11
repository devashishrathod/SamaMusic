const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const { mongoDb } = require("./database/mongoDb");
const { errorHandler } = require("./middlewares");
const allRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 6000;

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/sama-music/", allRoutes);
app.use(errorHandler);

app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "API not found",
  });
});

mongoDb();
app.listen(port, () => console.log(`App listening on port ${port}!`));
