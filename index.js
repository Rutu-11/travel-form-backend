const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const connect = () => {
  mongoose
    .connect(
      `mongodb+srv://rutujadhekolkar97:${process.env.MONGODB_PASSWORD}@cluster0.pdssvjd.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Connected to Server");
    })
    .catch((err) => {
      throw err;
    });
};

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
