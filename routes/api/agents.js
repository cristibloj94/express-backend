const express = require('express')
const router = express.Router()
const Agent = require('../../models/Agent')
const authenticateToken = require('../../middleware/auth')

// GET ALL AGENTS
router.get('/', authenticateToken, async (req, res) => {
    try {
        const agents = await Agent?.find()
        res.json(agents)
    } catch (err) { res.status(500).json({ message: err }) }
});

// GET SPECIFIC AGENT
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const agent = await Agent?.findById(req.params.id)
        res.json(agent)
    } catch (err) { res.status(500).json({ message: err }) }
});

// CREATE AGENT
router.post('/', authenticateToken, async (req, res) => {
    try {
        const agent = new Agent({ ...req.body })
        const savedAgent = await agent?.save()
        res.json(savedAgent)
    } catch (err) { res.status(500).json({ message: err }) }
});

// UPDATE AGENT
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedAgent = await Agent?.updateOne({ _id: req.params.id }, { ...req.body })
        res.json({ message: 'Agent updated successfully!' })
    } catch (err) { res.status(500).json({ message: err }) }
});

// DELETE AGENT
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const agentToDelete = await Agent?.remove({ _id: req.params.id })
        res.json({ message: 'Agent deleted successfully!' })
    } catch (err) { res.status(500).json({ message: err }) }
});

module.exports = router
