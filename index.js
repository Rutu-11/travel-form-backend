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
app.use('/',(req,res)=>{
  res.json({"msg":"hello word"})
})
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
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
