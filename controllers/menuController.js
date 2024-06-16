const Menu = require('../models/Menu');
const StatusCodes = require('../utils/statusCodes');

const getMenu = async (req, res, next) => {
    try {
        const menu = await Menu.find();
        res.status(StatusCodes.OK).json(menu);
    } catch (err) {
        next(err);
    }
};

const postMenu = async (req, res, next) => {
    const { name, description, price } = req.body;
// Check if all required fields are provided
    if (!name || !description || !price) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields are required' });
    }

    try {
        // Create and save a new menu item
        const menuItem = new Menu({ name, description, price });
        await menuItem.save();
        res.status(StatusCodes.CREATED).json(menuItem);
    } catch (err) {
        next(err);
    }
};

module.exports = { getMenu, postMenu };
