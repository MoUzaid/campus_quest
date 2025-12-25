const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
    {
        departmentNames:[String],
    },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);