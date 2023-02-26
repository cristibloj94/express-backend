const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date | undefined },
    nationalities: { type: Array, default: [] },
    position: { type: String | undefined },
    foot: { type: String | undefined },
    height: { type: Number | undefined },
    weight: { type: Number | undefined },
    cDate: { type: Date, default: Date.now },
    eDate: { type: Date, default: Date.now },
    retired: { type: Boolean, default: false },
    img: { type: String | undefined },
    salary: { type: Number | undefined },
    team: { type: Object | undefined },
    allTeams: { type: Array, default: [] },
    agent: { type: Object | undefined },
    clubStats: { type: Object | undefined },
    internationalStats: { type: Object | undefined },
    allClubStats: { type: Array, default: [] },
    allInternationalStats: { type: Array, default: [] },
    clubAwards: { type: Array, default: [] },
    internationalAwards: { type: Array, default: [] },
    nextMatch: { type: Object | undefined },
    marketValue: { type: Number | undefined },
    allMarketValues: { type: Array, default: [] },
    status: { type: String, default: "ACTIVE" },
})

module.exports = mongoose.model('Players', PlayerSchema)