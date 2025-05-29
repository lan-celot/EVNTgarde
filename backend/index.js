"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const events_1 = __importDefault(require("./routes/events"));
const reviews_1 = __importDefault(require("./routes/reviews"));
const uploadImage_1 = __importDefault(require("./routes/uploadImage"));
const super_admin_auth_1 = __importDefault(require("./routes/super-admin-auth"));
const rsvp_1 = __importDefault(require("./routes/rsvp"));
const app = (0, express_1.default)();
// Enable CORS with specific options
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow both localhost variations
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
}));
// Body parsing middleware
app.use(express_1.default.json());
// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log("Full URL:", req.originalUrl);
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    next();
});
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Test endpoint
app.get("/api/test", (req, res) => {
    console.log("Test endpoint hit");
    res.json({ message: "Test endpoint working" });
});
// Routes - ORDER MATTERS! More specific routes should come first
app.use("/api/superAdmin", super_admin_auth_1.default); // Super admin routes FIRST
app.use("/api", auth_1.default);
app.use("/api", events_1.default);
app.use("/api", reviews_1.default);
app.use("/api", uploadImage_1.default);
app.use("/api", rsvp_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", {
        message: err.message,
        stack: err.stack,
        code: err.code,
    });
    // Ensure we always send JSON responses
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? err : undefined,
    });
});
// 404 handler - must be after all other routes
app.use((req, res) => {
    console.log("404 Not Found:", req.method, req.path);
    console.log("Available routes:");
    console.log("- /api/superAdmin/superAdminQuickLogin");
    console.log("- /api/superAdmin/superAdminLogin");
    console.log("- /api/superAdmin/verification-requests");
    console.log("- /api/superAdmin/handle-verification");
    console.log("- /api/superAdmin/cancellation-requests");
    console.log("- /api/superAdmin/handle-cancellation");
    console.log("- /api/superAdmin/users");
    console.log("- /api/superAdmin/verify-user");
    res.status(404).json({
        success: false,
        message: `Endpoint not found: ${req.method} ${req.path}`,
    });
});
const PORT = process.env.PORT || 5000;
// Start server
const server = app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`CORS enabled for http://localhost:5173`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
    console.log(`Super Admin routes available at http://localhost:${PORT}/api/superAdmin/`);
});
// Handle server errors
server.on("error", (error) => {
    console.error("Server error:", error);
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
        process.exit(1);
    }
});
exports.default = app;
