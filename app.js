const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Routes
const mugRoutes = require("./routes/mugs");

//Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/mugs", mugRoutes);

app.listen(8000, () =>
  console.log("The Application is running on locoalhost:8000")
);
