const express = require('express')
const router = express.Router()
const Stadium = require('../../models/Stadium')
const authenticateToken = require('../../middleware/auth')

// GET ALL STADIUMS
router.get('/', authenticateToken, async (req, res) => {
    try {
        const stadiums = await Stadium?.find()
        return res.json(stadiums)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// GET SPECIFIC STADIUM
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const stadium = await Stadium?.findById(req.params.id)
        return res.json(stadium)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// CREATE STADIUM
router.post('/', authenticateToken, async (req, res) => {
    try {
        const stadium = new Stadium({ ...req.body })
        const savedStadium = await stadium?.save()
        return res.json(savedStadium)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// UPDATE STADIUM
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedStadium = await Stadium?.updateOne({ _id: req.params.id }, { ...req.body })
        return res.json({ message: 'Stadium updated successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

// DELETE STADIUM
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const stadiumToDelete = await Stadium?.remove({ _id: req.params.id })
        return res.json({ message: 'Stadium deleted successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

module.exports = router
