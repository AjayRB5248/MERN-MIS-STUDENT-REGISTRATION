const Student = require("../models/studentModel");

const getStudent = async (req, res) => {
  await Student.findById(req.params.id)
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getStudents = async (req, res) => {
  await Student.find()
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const createStudent = async (req, res) => {
  const profile = req.file ? req.file.filename : null;
  console.log(req.file);
  const {
    name,
    cid,
    email,
    batch,
    faculty,
    section,
    location,
    gender,
    Dob,
    height,
    weight,
    bloodgroup,
    hometown,
    contact,
    fathername,
    mothername,
    fathercontact,
  } = req.body;

  let emailExist;
  try {
    emailExist = await Student.findOne({ email });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
  let cidExist;
  try {
    cidExist = await Student.findOne({ cid });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
  if (cidExist) {
    return res.status(400).json({ error: "CId already exist" });
  }
  if (emailExist) {
    return res.status(400).json({ error: "Email already exist" });
  }
  const student = new Student({
    name,
    cid,
    email,
    profile,
    batch,
    faculty,
    section,
    location,
    gender,
    Dob,
    height,
    weight,
    bloodgroup,
    hometown,
    contact,
    fathername,
    mothername,
    fathercontact,
  });
  try {
    student.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ student });
};
const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return res.status(404).send("Student not found");
  }
  res.send(student);
};


module.exports = {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
};
