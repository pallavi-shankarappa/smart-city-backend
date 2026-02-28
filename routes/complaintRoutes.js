/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Complaint Management APIs
 */
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
/**
 * @swagger
 * /api/complaints:
 *   post:
 *     summary: Create a new complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Complaint created successfully
 */
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
/**
 * @swagger
 * /api/complaints/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get(
  "/stats",
  protect,
  authorize("officer"),
  getDashboardStats
);

// ===============================
// View complaints
// ===============================
/**
 * @swagger
 * /api/complaints:
 *   get:
 *     summary: Get all complaints
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of complaints
 */
router.get(
  "/",
  protect,
  getComplaints
);

// ===============================
// Assign complaint to officer
// ===============================
/**
 * @swagger
 * /api/complaints/{id}/assign:
 *   put:
 *     summary: Assign complaint to officer
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint assigned
 */
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
/**
 * @swagger
 * /api/complaints/{id}:
 *   put:
 *     summary: Update complaint status
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint status updated
 */
router.put(
  "/:id",
  protect,
  authorize("officer"),
  validateStatusUpdate,
  updateComplaintStatus
);

module.exports = router;