import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import exercises from "./routes/exercises.js";
import users from "./routes/users.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors()); //Middlewares//
app.use(express.json()); //Parsing JSON data//

const uri = process.env.ATLAS_URI; //uri = Database stored//
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(express.json());
app.use("/exercises", exercises);
app.use("/users", users);

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`); //Server Starts//
});
