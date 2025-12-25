const departmentController = require("../controllers/departmentController");
const express = require("express");
const router = express.Router();
const {
    addDepartments,
    getAllDepartments
} = departmentController;


router.post("/add", addDepartments);
router.get("/", getAllDepartments);

module.exports = router;