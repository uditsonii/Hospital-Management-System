const express = require('express');
const router = express.Router();
const deptController = require('../controllers/admincontroller/departmentcontroller');

// Remove '/departments' prefix here; use relative paths instead:
router.post('/', deptController.createDepartment);
router.get('/', deptController.getAllDepartments);
router.get('/:id', deptController.getDepartmentById);
router.put('/:id', deptController.updateDepartment);
router.delete('/:id', deptController.deleteDepartment);

module.exports = router;
