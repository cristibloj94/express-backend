const express = require('express')
const router = express.Router()
const Match = require('../../models/Match')
const authenticateToken = require('../../middleware/auth')

// GET ALL MATCHES
router.get('/', authenticateToken, async (req, res) => {
    try {
        const matches = await Match?.find()
        res.json(matches)
    } catch (err) { res.status(500).json({ message: err }) }
});

// GET SPECIFIC MATCH
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const match = await Match?.findById(req.params.id)
        res.json(match)
    } catch (err) { res.status(500).json({ message: err }) }
});

// CREATE MATCH
router.post('/', authenticateToken, async (req, res) => {
    try {
        const match = new Match({ ...req.body })
        const savedMatch = await match?.save()
        res.json(savedMatch)
    } catch (err) { res.status(500).json({ message: err }) }
});

// UPDATE MATCH
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedMatch = await Match?.updateOne({ _id: req.params.id }, { ...req.body })
        res.json({ message: 'Match updated successfully!' })
    } catch (err) { res.status(500).json({ message: err }) }
});

// DELETE MATCH
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const matchToDelete = await Match?.remove({ _id: req.params.id })
        res.json({ message: 'Match deleted successfully!' })
    } catch (err) { res.status(500).json({ message: err }) }
});

module.exports = router
