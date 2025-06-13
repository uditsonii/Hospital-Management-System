const express = require('express');
const departmentRoutes = express.Router();
const deptController = require('../controllers/admincontroller/departmentcontroller');

// Remove '/departments' prefix here; use relative paths instead:
departmentRoutes.post('/', deptController.createDepartment);
departmentRoutes.get('/', deptController.getAllDepartments);
departmentRoutes.get('/:id', deptController.getDepartmentById);
departmentRoutes.put('/:id', deptController.updateDepartment);
departmentRoutes.delete('/:id', deptController.deleteDepartment);

module.exports = departmentRoutes;
