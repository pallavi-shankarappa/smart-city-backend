const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// CONNECT DATABASE HERE
connectDB();

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});

app.use(express.json());
app.use(morgan("dev"));
app.use(limiter);
app.use(cors());


app.get("/", (req, res) => {
  res.send("Smart City Backend Running...");
});

const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});