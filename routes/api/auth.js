const express = require('express')
const router = express.Router()
const brcypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')
const User = require('../../models/User')
const Token = require('../../models/Token')

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

// TOKEN
router.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.sendStatus(401)

    try {
        const token = await Token?.find({ token: refreshToken })
        if (!token) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const accessToken = generateAccessToken({ ...user })
            res.json({ accessToken: accessToken })
        })
    } catch (err) { res.status(500).json({ message: 'Internal server error!' }) }
})

// LOGOUT
router.delete('/logout', async (req, res) => {
    try {
        const token = await Token?.remove({ token: req.body.token })
        res.sendStatus(204)
    } catch (err) { res.status(500).json({ message: 'Internal server error!' }) }
})

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const userItem = await User?.find({ email })?.lean()
    const user = userItem?.[0]

    if (!user) res.status(400).json({ message: 'User not found!' })
    if (!password) {
        return res.status(400).json({ message: 'Password is required!' })
    }

    try {
        const tokenUser = { userId: user?._id, email: user?.email }
        const accessToken = generateAccessToken(tokenUser)
        const refreshToken = jwt.sign(tokenUser, process.env.REFRESH_TOKEN_SECRET)

        if (await brcypt.compare(password, user?.password)) {
            const tokenItem = await Token?.find({ email: user?.email })
            const token = tokenItem?.[0]

            let savedToken
            if (!token) {
                const newToken = new Token({ userId: user?._id, email, token: refreshToken })
                savedToken = await newToken?.save()
            }
            else savedToken = await Token?.findOneAndUpdate({ email: user?.email }, { token: refreshToken })

            return res.json({ success: true, accessToken, refreshToken })
        }
        else res.json({ success: false, message: 'Wrong password!' })
    } catch (err) { res.status(500).json({ message: 'Internal server error!' }) }
})

// REGISTER
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        return res.status(400).json({ message: '{Email / password / name} are required!' })
    }
    try {
        const hashedPassword = await brcypt.hash(req.body.password, 10)
        const user = new User({ ...req.body, password: hashedPassword })
        const savedUser = await user?.save()
        res.json(savedUser)
    } catch (err) { res.status(500).json({ message: 'Internal server error!' }) }
})

module.exports = router
