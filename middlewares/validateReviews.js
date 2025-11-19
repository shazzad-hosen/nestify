const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");

module.exports.validateReviews = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    next(new ExpressError(400, error));
  } else {
    next();
  }
};
