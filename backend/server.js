import express from "express";
import dotenv from "dotenv";
import db, { sequelize } from "./models/index.js";

dotenv.config();
const app = express();
app.use(express.json());

sequelize.authenticate()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
