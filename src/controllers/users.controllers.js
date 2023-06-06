const User = require('../models/users.models');

exports.createUser = async (req, res) => {
  try {
    const { ID, name, email, password, role } = req.body;

    const user = await User.create({
      ID,
      name,
      email,
      password,
      role,
    });

    return res.status(200).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Error creating user',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { ID } = req.params;

    const user = await User.findOne({
      where: {
        ID,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving user',
    });
  }
};

exports.usersList = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Users retrieved successfully',
      results: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Error retrieving users',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { ID } = req.params;
    const { name, email } = req.body;
    const user = await User.findOne({
      where: {
        ID,
        status: 'available',
      },
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    await user.update({ name, email });

    return res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating user',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { ID } = req.params;

    const user = await User.findOne({
      where: {
        ID,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }

    await user.update({ status: 'disabled' });

    return res.status(200).json({
      status: 'success',
      message: 'user deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Ups. something went wrong',
    });
  }
};
