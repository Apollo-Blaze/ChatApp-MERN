import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connection.js";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //parse incoming req with JSON
app.use(cookieParser()); //parse cookies for middleware protectRoute
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
