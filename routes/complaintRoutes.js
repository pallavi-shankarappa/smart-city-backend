const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  getDashboardStats,
  assignComplaint
} = require("../controllers/complaintController");

const {
  validateComplaint,
  validateStatusUpdate,
  validateAssign
} = require("../middleware/validationMiddleware");

// ===============================
// Citizen can create complaint
// ===============================
router.post(
  "/",
  protect,
  authorize("citizen"),
  validateComplaint,
  createComplaint
);

// ===============================
// Dashboard statistics (Officer)
// IMPORTANT: Keep this BEFORE "/"
// ===============================
router.get(
  "/stats",
  protect,
  authorize("officer"),
  getDashboardStats
);

// ===============================
// View complaints
// ===============================
router.get(
  "/",
  protect,
  getComplaints
);

// ===============================
// Assign complaint to officer
// ===============================
router.put(
  "/:id/assign",
  protect,
  authorize("officer"),
  validateAssign,
  assignComplaint
);

// ===============================
// Update complaint status
// ===============================
router.put(
  "/:id",
  protect,
  authorize("officer"),
  validateStatusUpdate,
  updateComplaintStatus
);

module.exports = router;