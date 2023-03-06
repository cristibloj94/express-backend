const express = require('express')
const router = express.Router()
const Competition = require('../../models/Competition')
const authenticateToken = require('../../middleware/auth')

// GET ALL COMPETITIONs
router.get('/', authenticateToken, async (req, res) => {
    try {
        const competition = await Competition?.find()
        res.json(competition)
    } catch (err) { res.status(500).json({ message: err }) }
});

// GET SPECIFIC COMPETITION
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const competition = await Competition?.findById(req.params.id)
        res.json(competition)
    } catch (err) { res.status(500).json({ message: err }) }
});

// CREATE COMPETITION
router.post('/', authenticateToken, async (req, res) => {
    try {
        const competition = new Competition({ ...req.body })
        const savedCompetition = await competition?.save()
        res.json(savedCompetition)
    } catch (err) { res.status(500).json({ message: err }) }
});

// UPDATE COMPETITION
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedCompetition = await Competition?.updateOne({ _id: req.params.id }, { ...req.body })
        res.json({ message: 'Competition updated successfully!' })
    } catch (err) { res.status(500).json({ message: err }) }
});

// DELETE COMPETITION
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const competitionToDelete = await Competition?.remove({ _id: req.params.id })
        res.json({ message: 'Competition deleted successfully!' })
    } catch (err) { res.status(500).json({ message: err }) }
});

module.exports = router
