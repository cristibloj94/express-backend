const express = require('express')
const router = express.Router()
const Agent = require('../../models/Agent')
const authenticateToken = require('../../middleware/auth')

// GET ALL AGENTS
router.get('/', authenticateToken, async (req, res) => {
    try {
        const agents = await Agent?.find()
        return res.json(agents)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// GET SPECIFIC AGENT
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const agent = await Agent?.findById(req.params.id)
        return res.json(agent)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// CREATE AGENT
router.post('/', authenticateToken, async (req, res) => {
    try {
        const agent = new Agent({ ...req.body })
        const savedAgent = await agent?.save()
        return res.json(savedAgent)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// UPDATE AGENT
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedAgent = await Agent?.updateOne({ _id: req.params.id }, { ...req.body })
        return res.json({ message: 'Agent updated successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

// DELETE AGENT
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const agentToDelete = await Agent?.remove({ _id: req.params.id })
        return res.json({ message: 'Agent deleted successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

module.exports = router
