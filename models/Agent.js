const mongoose = require('mongoose')

const AgentSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date | undefined },
    nationalities: { type: Array, default: [] },
    city: { type: String | undefined },
    height: { type: Number | undefined },
    weight: { type: Number | undefined },
    retired: { type: Boolean | undefined },
    img: { type: String | undefined },
    players: { type: Array, default: [] },
    commissions: { type: Array, default: [] },
    ranking: { type: Number | undefined },
    status: { type: String, default: "ACTIVE" },
    cDate: { type: Date, default: Date.now },
    eDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Agents', AgentSchema)