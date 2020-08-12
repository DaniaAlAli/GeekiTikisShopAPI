const db = require("../db/db");

exports.signup = async (req, res, next) => {
  try {
    console.log("HIIIII");
  } catch (error) {
    next(error);
  }
};
