const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Student = require("./router/studentRoute");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

port = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.json("Server Started");
});

app.use("/api", Student);

mongoose
  .connect(
    process.env.URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Listenting at port ${port}`);
    });
  });
