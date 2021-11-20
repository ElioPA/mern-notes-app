const User = require('../models/User');

usersController = {};

usersController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersController.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json({message: 'User created'});
};

usersController.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({message: 'user deleted'});
};

module.exports = usersController;