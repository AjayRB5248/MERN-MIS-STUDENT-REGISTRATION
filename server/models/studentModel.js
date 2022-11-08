const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile:{
    type: String,
    required: true,
  },

  batch: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  Dob: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  hometown: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  mothername: {
    type: String,
    required: true,
  },
  fathercontact: {
    type: String,
    required: true,
  },
});

const Student = new mongoose.model("Student", studentSchema);
module.exports = Student;
