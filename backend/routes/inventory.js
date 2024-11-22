const express = require('express');
const db = require('../db');

const router = express.Router();

// Add Item Route
router.post('/', (req, res) => {
    const { name, quantity, price } = req.body;

    if (!name || !quantity || !price) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const query = 'INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)';
    db.run(query, [name, quantity, price], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ id: this.lastID, name, quantity, price });
    });
});

module.exports = router;
