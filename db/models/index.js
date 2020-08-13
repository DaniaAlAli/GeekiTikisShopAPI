const Vendor = require("./Vendor");
const Mug = require("./Mug");
const User = require("./User");

//A Vendor has Many mugs
Vendor.hasMany(Mug, {
  as: "mugs",
  foreignKey: "vendorId",
  allowNull: false,
});

Mug.belongsTo(Vendor, { as: "vendor" });

User.hasOne(Vendor, { foreignKey: "userId" });

Vendor.belongsTo(User, { as: "user", foreignKey: "userId" });

module.exports = { Vendor, Mug, User };
