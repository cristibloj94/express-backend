const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
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
            return res.json({ accessToken: accessToken })
        })
    } catch (err) { return res.status(500).json({ message: err }) }
})

// LOGOUT
router.delete('/logout', async (req, res) => {
    try {
        const token = await Token?.remove({ token: req.body.token })
        return res.sendStatus(204)
    } catch (err) { res.status(500).json({ message: err }) }
})

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const userItem = await User?.find({ email })?.lean()
        const user = userItem?.[0]

        if (!user) return res.status(400).json({ message: 'User not found!' })
        if (!password) {
            return res.status(400).json({ message: 'Password is required!' })
        }

        const tokenUser = { userId: user?._id, email: user?.email }
        const accessToken = generateAccessToken(tokenUser)
        const refreshToken = jwt.sign(tokenUser, process.env.REFRESH_TOKEN_SECRET)

        if (await bcrypt.compare(password, user?.password)) {
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
        else return res.status(400).json({ message: 'Wrong password!' })
    } catch (err) { return res.status(500).json({ message: err }) }
})

// REGISTER
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body

    if (!email || !password || !name) return res.status(400).json({ message: '{Email / password / name} are required!' })

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({ ...req.body, password: hashedPassword })
        const savedUser = await user?.save()
        return res.json(savedUser)
    } catch (err) { return res.status(500).json({ message: err }) }
})

// RESET PASSWORD
router.post('/reset-password', async (req, res) => {
    const { email, oldPassword, newPassword, newPasswordConfirm } = req.body

    if (!email || !oldPassword || !newPassword || !newPasswordConfirm) return res.status(400).json({ message: '{Email / Old password / New password / New password confirm} are all required!' })
    if (newPassword !== newPasswordConfirm) return res.status(400).json({ message: 'Passwords need to match!' })

    try {
        const userItem = await User?.find({ email })
        const user = userItem?.[0]
        if (!user) return res.status(400).json({ message: 'User not found!' })

        if (await bcrypt.compare(oldPassword, user?.password)) {
            const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10)
            const newPasswordAction = await User?.findOneAndUpdate({ email: user?.email }, { password: hashedNewPassword })
            return res.json({ success: true, message: "Password updated!" })
        }
        else return res.status(400).json({ message: 'Wrong password!' })
    } catch (err) { return res.status(500).json({ message: err }) }
})

module.exports = router
