const mongoose = require('mongoose')

const ManagerSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date | undefined },
    nationalities: { type: Array, default: [] },
    city: { type: String | undefined },
    position: { type: String | undefined },
    foot: { type: String | undefined },
    height: { type: Number | undefined },
    weight: { type: Number | undefined },
    cDate: { type: Date, default: Date.now },
    eDate: { type: Date, default: Date.now },
    img: { type: String | undefined },
    salary: { type: Number | undefined },
    agent: { type: String | undefined },
    team: { type: String | undefined },
    allTeams: { type: Array, default: [] },
    clubStats: { type: Array, default: [] },
    internationalStats: { type: Array, default: [] },
    allClubStats: { type: Array, default: [] },
    allInternationalStats: { type: Array, default: [] },
    clubAwards: { type: Array, default: [] },
    internationalAwards: { type: Array, default: [] },
    nextMatch: { type: String | undefined },
    playerCareerStats: { type: Array, default: [] },
    status: { type: String, default: "ACTIVE" },
})

module.exports = mongoose.model('Managers', ManagerSchema)