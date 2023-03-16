const express = require('express')
const router = express.Router()
const Manager = require('../../models/Manager')
const authenticateToken = require('../../middleware/auth')

// GET ALL MANAGERS
router.get('/', authenticateToken, async (req, res) => {
    try {
        const managers = await Manager?.find()
        return res.json(managers)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// GET SPECIFIC MANAGER
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const manager = await Manager?.findById(req.params.id)
        return res.json(manager)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// CREATE MANAGER
router.post('/', authenticateToken, async (req, res) => {
    try {
        const manager = new Manager({ ...req.body })
        const savedManager = await manager?.save()
        return res.json(savedManager)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// UPDATE MANAGER
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedManager = await Manager?.updateOne({ _id: req.params.id }, { ...req.body })
        return res.json({ message: 'Manager updated successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

// DELETE MANAGER
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const managerToDelete = await Manager?.remove({ _id: req.params.id })
        return res.json({ message: 'Manager deleted successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

module.exports = router
