const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// DB
const db = require("./db");

// Routes
const vendorRoutes = require("./routes/vendors");
const mugRoutes = require("./routes/mugs");
const userRoutes = require("./routes/users");

// Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routers
app.use("/vendors", vendorRoutes);
app.use("/mugs", mugRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

//Not Found Path
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

// Error Handling MiddleWare
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync({ force: true });
  } catch (error) {
    console.log("error:", error);
  }
};

run();

app.listen(8000, () =>
  console.log("The Application is running on localhost:8000")
);
