const express = require("express");

//controllers
const {
  mugCreate,
  mugList,
  mugUpdate,
  mugDelete,
  fetchMug,
} = require("../controllers/mugControllers");

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

// Mug create
router.post("/", mugCreate);

// Mug update
router.put("/:mugID", mugUpdate);

// Mug Delete
router.delete("/:mugID", mugDelete);

module.exports = router;
