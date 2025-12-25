const Department = require("../models/departmentsModel");

// ADD DEPARTMENTS
exports.addDepartments = async (req, res) => {
  try {
    const { departmentNames } = req.body;

    if (!departmentNames || !Array.isArray(departmentNames)) {
      return res.status(400).json({
        success: false,
        message: "departmentNames must be an array",
      });
    }

    const department = await Department.create({
      departmentNames,
    });

    return res.status(201).json({
      success: true,
      message: "Departments added successfully",
      data: department,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding departments",
      error: error.message,
    });
  }
};

// GET ALL DEPARTMENTS
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching departments",
      error: error.message,
    });
  }
};
