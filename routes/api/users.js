const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../../models/User')

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User?.find()
        res.json(users)
    } catch (err) { res.status(400).json({ message: err }) }
});

// GET SPECIFIC USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User?.findById(req.params.id)
        res.json(user)
    } catch (err) { res.status(400).json({ message: 'User not found!' }) }
});

// CREATE USER
router.post('/', async (req, res) => {
    const { name, email } = req.body
    if (!name || !email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    try {
        const user = new User({ ...req.body })
        const savedUser = await user?.save()
        res.json(savedUser)
    } catch (err) { res.status(400).json({ message: err }) }
});

// UPDATE USER
router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User?.updateOne({ _id: req.params.id }, { ...req.body })
        res.json({ message: 'User updated successfully!' })
    } catch (err) { res.status(400).json({ message: err }) }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
    try {
        const userToDelete = await User?.remove({ _id: req.params.id })
        res.json({ message: 'User deleted successfully!' })
    } catch (err) { res.status(400).json({ message: err }) }
});

module.exports = router