import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  "https://portfolio-backend-cyan-sigma.vercel.app", // backend
  "http://localhost:5173", // dev frontend
  "https://portforlio-client.vercel.app", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin:  "http://localhost:5173" || "*",
//   })
// );

app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import contactRouter from "./routes/contact.routes.js";
app.use("/api/v1", contactRouter);

export { app };
