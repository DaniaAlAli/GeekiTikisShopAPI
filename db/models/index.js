const Vendor = require("./Vendor");
const Mug = require("./Mug");

//A Vendor has Many mugs
Vendor.hasMany(Mug, { as: "mugs", foreignKey: "vendorId", allowNull: false }); //lowercase d for ID
Mug.belongsTo(Vendor, { as: "vendor" });
module.exports = {
  Vendor,
  Mug,
};
