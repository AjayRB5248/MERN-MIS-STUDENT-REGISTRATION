const express = require("express");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `image-${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage });

const {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
} = require("../controllers/student");
const router = express.Router();

router.get("/students", getStudents);
router.get("/students/:id", getStudent);
router.post("/student", upload.single("profile"), createStudent);
router.delete("/student/:id", deleteStudent);

module.exports = router;
