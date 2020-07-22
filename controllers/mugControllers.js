const slugify = require("slugify");

//Data
let mugs = require("../mugs");

exports.mugList = (req, res) => {
  res.json(mugs);
};

exports.mugCreate = (req, res) => {
  const id = mugs[mugs.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newMug = { id, slug, ...req.body };
  mugs.push(newMug);

  res.status(201).json(newMug);
};

exports.mugUpdate = (req, res) => {
  // find the mug
  const { mugID } = req.params;
  const foundMug = mugs.find((mug) => mug.id === +mugID);

  // check if mug exists
  if (foundMug) {
    for (const key in req.body) foundMug[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Mug Not Found" });
  }

  // fetch the data from the body
  // Update the mug
};

exports.mugDelete = (req, res) => {
  const { mugID } = req.params;
  const foundMug = mugs.find((mug) => mug.id === +mugID);

  if (foundMug) {
    mugs = mugs.filter((mug) => mug.id !== +mugID);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Mug Not Found" });
  }
};
