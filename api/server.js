import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

const wss = new WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  // Grap the cookie from the request
  const cookies = req.headers.cookies;
  console.log(cookies);
  // if (cookies) {
  //   const cookieString = cookies
  //     .split(";")
  //     .find((str) => (str) => startsWith("jwtCookie="));

  if (cookieString) {
    // const token = cookieString.split("=")[1];
    // if (token) {
    //   jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userId) => {
    // if (err) throw err;
    // const userDocs = await User.findById(data.userId);
    // connection.userId = userDocs._id;
    // connection.username = userDocs.username;
    // });
  }
  // }
  // }
  // console.log([...wss.clients].length());
});
