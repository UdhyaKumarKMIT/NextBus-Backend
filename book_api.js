const express = require('express');
const router = express.Router();
const Bus = require('./models/Bus');       // Bus collection
const Route = require('./models/Route');   // Route collection

// POST /book/search_bus
router.post('/search_bus', async (req, res) => {
    const { source, destination, date } = req.body;

    if (!source || !destination || !date) {
        return res.status(400).json({ message: "Please provide source, destination, and date" });
    }

    try {
        // 1. Find route matching source and destination
        const route = await Route.findOne({ origin: source, destination: destination });
        if (!route) {
            return res.status(404).json({ message: "No route found for this source and destination" });
        }

        // 2. Find buses running on that route and on the given day
        // Get day of the week from date
        const day = new Date(date).toLocaleString('en-US', { weekday: 'short' }); // "Mon", "Tue", etc.

        const buses = await Bus.find({ 
            route_id: route.route_id,
            days: day 
        });

        if (buses.length === 0) {
            return res.status(404).json({ message: "No buses available on this date" });
        }

        res.json({ route, buses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
