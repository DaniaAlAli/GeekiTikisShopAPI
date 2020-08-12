const express = require("express");
const multer = require("multer");
const upload = require("../middleware/multer");

//controllers
const {
  vendorCreate,
  vendorList,
  vendorUpdate,
  vendorDelete,
  fetchVendor,
  mugCreate,
} = require("../controllers/vendorControllers");
const passport = require("passport");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  }, //cb = callback function
});

// const upload = multer({ storage });

const router = express.Router();

router.param("vendorId", async (req, res, next, vendorId) => {
  const vendor = await fetchVendor(vendorId, next);

  if (vendor) {
    req.vendor = vendor;
    next();
  } else {
    const err = new Error("Vendor Not Found");
    err.status = 404;
    next(err);
  }
});

// vendor List
router.get("/", vendorList);

// vendor create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  vendorCreate
);

// vendor update
router.put("/:vendorId", upload.single("image"), vendorUpdate);

// vendor Delete
router.delete("/:vendorId", vendorDelete);

// Mug create
router.post("/:vendorId/mugs", upload.single("image"), mugCreate);

module.exports = router;
