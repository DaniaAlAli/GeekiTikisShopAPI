const slugify = require("slugify");

//Data
let mugs = require("../mugs"); //Delete it
const { Mug, Vendor } = require("../db/models");
const { findByPk } = require("../db/models/Mug");

exports.fetchMug = async (mugID, next) => {
  try {
    const mug = await Mug.findByPk(mugID);
    return mug;
  } catch (error) {
    next(error);
  }
};

exports.mugList = async (req, res, next) => {
  try {
    const _mugs = await Mug.findAll({
      attributes: { exclude: ["vendorId", "createdAt", "updatedAt"] },
      include: {
        model: Vendor,
        as: "vendor",
        attributes: ["name"],
      },
    });
    res.json(_mugs);
  } catch (error) {
    next(error);
  }
};

exports.mugUpdate = async (req, res, next) => {
  console.log(" exports.mugUpdate - > req", req.mug);

  try {
    req.body.image = `${req.protocol}://${req.get("host")}/media/${
      req.file.filename
    }`;
    await req.mug.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.mugDelete = async (req, res, next) => {
  try {
    await req.mug.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
