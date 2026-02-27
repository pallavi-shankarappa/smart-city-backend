const Complaint = require("../models/Complaint");

// Create Complaint
const createComplaint = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      citizen: req.user.id,
    });

    res.status(201).json({
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
    next(error);
  }
};

// Get Complaints (Role + Filter + Pagination + Search + Sort)
const getComplaints = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 5, sort, keyword } = req.query;

    let query = {};

    // Role-based filter
    if (req.user.role === "citizen") {
      query.citizen = req.user.id;
    }

    if (req.user.role === "officer") {
      query.assignedOfficer = req.user.id;
    }

    if (status) {
      query.status = status;
    }

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    let sortOption = {};
    if (sort === "latest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const total = await Complaint.countDocuments(query);

    const complaints = await Complaint.find(query)
      .populate("citizen", "name email")
      .populate("assignedOfficer", "name email")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: complaints,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    next(error);
  }
};
// Update Complaint Status (Controlled Transition)
const updateComplaintStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const validTransitions = {
      pending: ["in-progress"],
      "in-progress": ["resolved"],
      resolved: []
    };

    if (!validTransitions[complaint.status].includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from ${complaint.status} to ${status}`
      });
    }

    complaint.status = status;
    await complaint.save();

    res.json({
      message: "Status updated successfully",
      complaint,
    });

  } catch (error) {
    next(error);
  }
};

// Assign Complaint to Officer
const assignComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.assignedOfficer = req.body.officerId;

    // Auto change status
    complaint.status = "in-progress";

    await complaint.save();

    res.json({
      message: "Complaint assigned and moved to in-progress",
      complaint,
    });

  } catch (error) {
    next(error);
  }
};

// Dashboard Stats
const getDashboardStats = async (req, res, next) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "pending" });
    const resolved = await Complaint.countDocuments({ status: "resolved" });
    const inProgress = await Complaint.countDocuments({ status: "in-progress" });

    res.json({
      total,
      pending,
      resolved,
      inProgress,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  assignComplaint,
  getDashboardStats,
};