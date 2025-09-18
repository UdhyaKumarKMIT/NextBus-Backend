// models/Bus.js
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    bus_id: {
        type: Number,
        required: true,
        unique: true
    },
    op_id: {
        type: Number,
        required: true
    },
    route_id: {
        type: Number,
        required: true
    },
    bus_no: {
        type: String,
        required: true
    },
    bus_type: {
        type: String,
        required: true
    },
    total_seat: {
        type: Number,
        required: true
    },
    days: {
        type: [String], // e.g., ["Mon", "Wed", "Fri"]
        required: true
    }
}, { collection: 'Bus' }); // Ensures it uses 'Bus' collection

module.exports = mongoose.model('Bus', busSchema);
