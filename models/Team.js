const mongoose = require('mongoose')

const TeamSchema = mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    league: { type: String, required: true },
    stadium: { type: String, required: true },
    prevStadiums: { type: Array, default: [] },
    img: { type: String | undefined },
    team: { type: String | undefined },
    previousTeams: { type: Array, default: [] },
    owner: { type: String | undefined },
    manager: { type: String, required: true },
    stats: { type: Array, default: [] },
    cupStats: { type: Array, default: [] },
    internationalStats: { type: Array, default: [] },
    allStats: { type: Array, default: [] },
    allCupStats: { type: Array, default: [] },
    allInternationalStats: { type: Array, default: [] },
    awards: { type: Array, default: [] },
    cupAwards: { type: Array, default: [] },
    internationalAwards: { type: Array, default: [] },
    matches: { type: Array, default: [] },
    cupMatches: { type: Array, default: [] },
    internationalMatches: { type: Array, default: [] },
    nextMatch: { type: String | undefined },
    marketValue: { type: Number | undefined },
    allMarketValues: { type: Array, default: [] },
    founded: { type: Date | undefined },
    status: { type: String, default: "ACTIVE" },
    cDate: { type: Date, default: Date.now },
    eDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Teams', TeamSchema)