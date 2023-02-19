const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const users = require('../../Users')

const idFilter = req => user => user?.id === parseInt(req?.params?.id);

// Gets All Users
router.get('/', (req, res) => res?.json(users));

// Get Single User
router.get('/:id', (req, res) => {
    const found = users?.some(idFilter(req));

    if (found) {
        res?.json(users?.filter(idFilter(req)));
    } else {
        res?.status(400).json({ msg: `No user with the id of ${req?.params?.id}` });
    }
});

// Create User
router.post('/', (req, res) => {
    const newUser = {
        ...req?.body,
        id: uuid?.v4(),
        status: 'active'
    };

    if (!newUser?.name || !newUser?.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    users?.push(newUser);
    res?.json(users);
});

// Update User
router.put('/:id', (req, res) => {
    const found = users?.some(idFilter(req));

    if (found) {
        users?.map((user, i) => {
            if (idFilter(req)(user)) {
                const updatedUser = { ...user, ...req?.body };
                users[i] = updatedUser
                res?.json({ msg: 'User updated successfully!', updatedUser });
            }
        });
    } else {
        res?.status(400).json({ msg: `No user with the id of ${req?.params?.id}` });
    }
});

// Delete Member
router.delete('/:id', (req, res) => {
    const found = users?.some(idFilter(req));

    if (found) {
        res.json({
            msg: 'User deleted successfully!',
            users: users?.filter(member => !idFilter(req)(member))
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req?.params?.id}` });
    }
});

module.exports = router