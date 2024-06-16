const Order = require('../models/Order');
const Menu = require('../models/Menu');
const StatusCodes = require('../utils/statusCodes');

//Creates a new order in the database.
const createOrder = async (req, res, next) => {
    const { items } = req.body;

    // Check if items are provided
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Items are required' });
    }

    try {
        let totalPrice = 0;

        // Calculate the total price
        for (const item of items) {
            const menuItem = await Menu.findById(item.menuId);
            if (!menuItem) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: `Menu item not found: ${item.menuId}` });
            }
            totalPrice += menuItem.price * item.quantity;
        }

        // Create and save the order
        const order = new Order({
            userId: req.user.userId,
            items,
            totalPrice
        });
        await order.save();

        res.status(StatusCodes.CREATED).json({ message: 'Order placed successfully', order });
    } catch (err) {
        next(err);
    }
};

module.exports = { createOrder };
