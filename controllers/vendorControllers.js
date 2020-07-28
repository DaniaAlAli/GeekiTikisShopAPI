const slugify = require("slugify");

//Data
const { Vendor, Mug } = require("../db/models");
const { findByPk } = require("../db/models/Vendor");

exports.fetchVendor = async (vendorID, next) => {
  try {
    const vendor = await Vendor.findByPk(vendorID);
    return vendor;
  } catch (error) {
    next(error);
  }
};

exports.vendorList = async (req, res, next) => {
  try {
    const vendors = await Vendor.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Mug,
          as: "mugs",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

exports.vendorCreate = async (req, res, next) => {
  try {
    req.body.image = `${req.protocol}://${req.get("host")}/media/${
      req.file.filename
    }`;
    const newVendor = await Vendor.create(req.body);
    res.status(201).json(newVendor);
  } catch (error) {
    next(error);
  }
};

exports.vendorUpdate = async (req, res, next) => {
  try {
    req.body.image = `${req.protocol}://${req.get("host")}/media/${
      req.file.filename
    }`;
    await req.vendor.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.vendorDelete = async (req, res, next) => {
  try {
    await req.vendor.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.mugCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.vendorId = req.vendor.id;
    const newMug = await Mug.create(req.body);
    res.status(201).json(newMug);
  } catch (error) {
    next(error);
  }
};
