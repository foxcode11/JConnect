import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import ImageUploadRouter from "./routes/uploadImageRoute.js";
import connectDB from "./db/connect.js";
import path from "path";
// routers
import authRouter from "./routes/authRoutes.js";
import projectsRouter from "./routes/projectsRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import notes from "./routes/notes.js";
import file from "./routes/file.js";

// cors
app.use(cors({ origin: true, credentials: true })); // added

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import authenticateClub from "./middleware/auth-club.js";

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", authenticateUser, projectsRouter);
app.use("/api/v1/notes", notes);
app.use("/api/v1/file", file);
app.use("/api/v1/events", eventRouter);
app.use("/api", ImageUploadRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
