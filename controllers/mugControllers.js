const slugify = require("slugify");

//Data
let mugs = require("../mugs"); //Delete it
const { Mug } = require("../db/models");
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_mugs);
  } catch (error) {
    next(error);
  }
};

exports.mugCreate = async (req, res, next) => {
  try {
    const newMug = await Mug.create(req.body);
    res.status(201).json(newMug);
  } catch (error) {
    next(error);
  }
};

exports.mugUpdate = async (req, res, next) => {
  console.log(" exports.mugUpdate - > req", req.mug);

  try {
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
