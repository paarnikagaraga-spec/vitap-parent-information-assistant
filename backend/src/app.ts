
import authRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/student.routes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { auditLogger } from "./middleware/audit.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);
app.use("/api", auditLogger);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "VIT-AP Parent Information Assistant Backend is running",
  });
});

app.use("/api/student", studentRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});