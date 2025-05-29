import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import eventsRoutes from "./routes/events";
import reviewRoutes from "./routes/reviews";
import uploadImages from "./routes/uploadImage";
import guestListRoutes from "./routes/guestList";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  console.log("Test endpoint hit");
  res.json({ message: "Test endpoint working" });
});

// Routes under /api
app.use("/api", authRoutes);
app.use("/api", eventsRoutes);
app.use("/api", reviewRoutes);
app.use("/api", uploadImages);
app.use("/api", guestListRoutes); // ✅ updated to be under /api

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Server error:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
    });

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
      error: process.env.NODE_ENV === "development" ? err : undefined,
    });
  }
);

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  console.log("404 Not Found:", req.method, req.path);
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.path}`,
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`CORS enabled for http://localhost:5173`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});

server.on("error", (error: any) => {
  console.error("Server error:", error);
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    process.exit(1);
  }
});
