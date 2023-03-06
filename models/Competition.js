const mongoose = require('mongoose')

const CompetitionSchema = mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    img: { type: String | undefined },
    teams: { type: Array, default: [] },
    previousTeams: { type: Array, default: [] },
    champions: { type: Array, default: [] },
    stats: { type: Array, default: [] },
    allStats: { type: Array, default: [] },
    awards: { type: Array, default: [] },
    allAwards: { type: Array, default: [] },
    founded: { type: Date | undefined },
    status: { type: String, default: "ACTIVE" },
    cDate: { type: Date, default: Date.now },
    eDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Competitions', CompetitionSchema)