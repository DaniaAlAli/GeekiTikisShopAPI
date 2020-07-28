const express = require("express");
const multer = require("multer");
const upload = require("../middleware/multer");

//controllers
const {
  mugList,
  mugUpdate,
  mugDelete,
  fetchMug,
} = require("../controllers/mugControllers");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  }, //cb = callback function
});

// const upload = multer({ storage });

const router = express.Router();

router.param("mugID", async (req, res, next, mugID) => {
  console.log(`The Value of the Mug ID is ${mugID}`);
  const mug = await fetchMug(mugID, next);
  req.mug = mug;
  if (mug) {
    req.mug = mug;
    next();
  } else {
    const err = new Error("Mug Not Found");
    err.status = 404;
    next(err);
  }
});

// Mug List
router.get("/", mugList);

// Mug update
router.put("/:mugID", upload.single("image"), mugUpdate);

// Mug Delete
router.delete("/:mugID", mugDelete);

module.exports = router;
