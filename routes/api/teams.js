const express = require('express')
const router = express.Router()
const Team = require('../../models/Team')
const authenticateToken = require('../../middleware/auth')

// GET ALL TEAMS
router.get('/', authenticateToken, async (req, res) => {
    try {
        const teams = await Team?.find()
        return res.json(teams)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// GET SPECIFIC TEAM
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const team = await Team?.findById(req.params.id)
        return res.json(team)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// CREATE TEAM
router.post('/', authenticateToken, async (req, res) => {
    try {
        const team = new Team({ ...req.body })
        const savedTeam = await team?.save()
        return res.json(savedTeam)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// UPDATE TEAM
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedTeam = await Team?.updateOne({ _id: req.params.id }, { ...req.body })
        return res.json({ message: 'Team updated successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

// DELETE TEAM
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const teamToDelete = await Team?.remove({ _id: req.params.id })
        return res.json({ message: 'Team deleted successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

module.exports = router
