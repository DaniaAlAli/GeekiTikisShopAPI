const express = require("express");
const cors = require("cors");

//Data
let mugs = require("./mugs");

//Create Express App instance
const app = express();

app.use(cors());

// app.get("/dania", (request, response) => {
//   console.log("HII!");
//   response.json({ message: "HELLO WORLD!" });
// });

app.get("/mugs", (req, res) => {
  res.json(mugs);
});

// Mug Delete
app.delete("/mugs/:mugID", (req, res) => {
  const { mugID } = req.params;
  const foundMug = mugs.find((mug) => mug.id === +mugID);

  if (foundMug) {
    mugs = mugs.filter((mug) => mug.id !== +mugID);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Mug Not Found" });
  }
});

app.listen(8000, () =>
  console.log("The Application is running on locoalhost:8000")
);
