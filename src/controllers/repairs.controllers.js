const Repair = require('../models/repairs.models');

exports.getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });

    return res.status(200).json({
      status: 'success',
      repairs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Error retrieving repairs',
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { date, userID } = req.body;

    const repair = await Repair.create({
      date,
      userID,
    });

    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Error creating repair',
    });
  }
};

exports.getRepair = async (req, res) => {
  try {
    const { ID } = req.params;

    const repair = await Repair.findOne({
      where: {
        ID,
        status: 'pending',
      },
    });

    if (!repair)
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });

    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Error retrieving repair',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { ID } = req.params;
    //const { status } = req.body;

    const repair = await Repair.findOne({
      where: {
        ID,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

    await repair.update({ status: 'completed' });

    return res.status(200).json({
      status: 'success',
      message: 'Repair updated successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Error updating repair',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { ID } = req.params;

    const repair = await Repair.findOne({
      where: {
        ID,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

    await repair.update({ status: 'cancelled' });

    return res.status(200).json({
      status: 'success',
      message: 'Repair deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Error deleting repair',
    });
  }
};
