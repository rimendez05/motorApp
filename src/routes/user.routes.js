const express = require('express');
const userController = require('../controllers/users.controllers');

const router = express.Router();

router.route('/').post(userController.createUser).get(userController.usersList);

router
  .route('/:ID')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
