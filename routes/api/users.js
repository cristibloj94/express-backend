const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const authenticateToken = require('../../middleware/auth')

// GET ALL USERS
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User?.find()
        return res.json(users)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// GET SPECIFIC USER
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User?.findById(req.params.id)
        return res.json(user)
    } catch (err) { return res.status(500).json({ message: err }) }
});

// UPDATE USER
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedUser = await User?.updateOne({ _id: req.params.id }, { ...req.body })
        return res.json({ message: 'User updated successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

// DELETE USER
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const userToDelete = await User?.remove({ _id: req.params.id })
        return res.json({ message: 'User deleted successfully!' })
    } catch (err) { return res.status(500).json({ message: err }) }
});

module.exports = router
