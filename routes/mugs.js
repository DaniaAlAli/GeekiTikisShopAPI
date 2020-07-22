const express = require("express");

//controllers
const {
  mugCreate,
  mugList,
  mugUpdate,
  mugDelete,
} = require("../controllers/mugControllers");

const router = express.Router();

// Mug List
router.get("/", mugList);

// Mug create
router.post("/", mugCreate);

// Mug update
router.put("/:mugID", mugUpdate);

// Mug Delete
router.delete("/:mugID", mugDelete);

module.exports = router;
