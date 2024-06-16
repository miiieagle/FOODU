const mongoose = require('mongoose');

// Define the schema for menu items
const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

// Export the model
module.exports = mongoose.model('Menu', MenuSchema);
