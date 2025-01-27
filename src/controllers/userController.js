const User = require("../models/User");
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      // console.log(user);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user",
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            name: updates.name,
            email: updates.email,
            phone: updates.phone,
            address: updates.address,
            dateOfBirth: updates.dateOfBirth,
            gender: updates.gender,
            bloodType: updates.bloodType,
            emergencyContact: updates.emergencyContact,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: "Failed to update user details",
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
