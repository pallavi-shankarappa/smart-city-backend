const { body, validationResult } = require("express-validator");

/* ================================
   Validate Complaint Creation
================================ */
const validateComplaint = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .isIn(["electricity", "water", "road", "garbage"])
    .withMessage("Invalid category"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

/* ================================
   Validate Status Update
================================ */
const validateStatusUpdate = [
  body("status")
    .isIn(["pending", "in-progress", "resolved"])
    .withMessage("Invalid status value"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

/* ================================
   Validate Assign Complaint
================================ */
const validateAssign = [
  body("officerId")
    .notEmpty()
    .withMessage("Officer ID is required")
    .isMongoId()
    .withMessage("Invalid Officer ID"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = {
  validateComplaint,
  validateStatusUpdate,
  validateAssign,
};