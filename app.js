const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

//Data
let mugs = require("./mugs");
const { response } = require("express");

//Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mug List
app.get("/mugs", (req, res) => {
  res.json(mugs);
});

//Mug create
app.post("/mugs", (req, res) => {
  const id = mugs[mugs.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newMug = { id, slug, ...req.body };
  mugs.push(newMug);
  res.status(201).json(newMug);
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
