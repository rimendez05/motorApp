const express = require('express');
const repairController = require('../controllers/repairs.controllers');

const router = express.Router();

router
  .route('/')
  .get(repairController.getAllRepairs)
  .post(repairController.createRepair);

router
  .route('/:ID')
  .get(repairController.getRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
