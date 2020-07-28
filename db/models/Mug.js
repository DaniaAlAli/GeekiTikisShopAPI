const { Model, DataTypes } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const db = require("../db");

class Mug extends Model {}

Mug.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 7,
      validate: {
        min: {
          args: 7,
          msg: "minimum price is 7KD",
        },
      },
    },
    barcode: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);
SequelizeSlugify.slugifyModel(Mug, { source: ["name"] });

module.exports = Mug;
