const express = require('express')
const router = express.Router()
const Player = require('../../models/Player')
const authenticateToken = require('../../middleware/auth')

// GET ALL PLAYERS
router.get('/', authenticateToken, async (req, res) => {
    try {
        const players = await Player?.find()
        return res.json(players)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// GET SPECIFIC PLAYER
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const player = await Player?.findById(req.params.id)
        return res.json(player)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// CREATE PLAYER
router.post('/', authenticateToken, async (req, res) => {
    try {
        const player = new Player({ ...req.body })
        const savedPlayer = await player?.save()
        return res.json(savedPlayer)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// UPDATE PLAYER
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedPlayer = await Player?.updateOne({ _id: req.params.id }, { ...req.body })
        return res.json({ message: 'Player updated successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

// DELETE PLAYER
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const playerToDelete = await Player?.remove({ _id: req.params.id })
        return res.json({ message: 'Player deleted successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

module.exports = router
