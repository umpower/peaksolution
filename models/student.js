const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        firstName : String,
        lastName : String,
        dateOfBirth : String,
        gender : String,
        email : String,
        phone : String
    }
);

module.exports = mongoose.model("Student", studentSchema);