// models/Route.js
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    route_id: {
        type: Number,
        required: true,
        unique: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { collection: 'Route' }); // Ensures it uses 'Route' collection in MongoDB

module.exports = mongoose.model('Route', routeSchema);
