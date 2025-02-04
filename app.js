import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRouter from "./api/contacts.js";
import usersRouter from "./api/users.js";
import passport from "./config/config-passport.js";
import { auth } from "./controller/users.js";

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", auth, contactsRouter);
app.use("/api/users", usersRouter);
app.use(passport.initialize());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
