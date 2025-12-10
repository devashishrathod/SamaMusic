require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const { mongoDb } = require("./database/mongoDb");
const { errorHandler } = require("./middlewares");
const { throwError } = require("./utils");
const allRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 6000;

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(express.json());
app.use(
  cors({
    origin: ["https://api.samasongadmin.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(morgan("dev"));
app.use("/sama-music/", allRoutes);
app.get("/", async (req, res) => {
  res.send("Welcome to Sama Songs🎶🚀");
});
app.use((req, res, next) => {
  throwError(404, "Invalid API");
});
app.use(errorHandler);

mongoDb();
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
