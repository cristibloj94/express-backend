const mongoose = require('mongoose')

const MatchSchema = mongoose.Schema({
    time: { type: Date | undefined },
    home: { type: String | undefined },
    away: { type: String | undefined },
    competition: { type: String | undefined },
    round: { type: String | undefined },
    referee: { type: String | undefined },
    isDerby: { type: Boolean | undefined },
    status: { type: String, default: "ACTIVE" },
    cDate: { type: Date, default: Date.now },
    eDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Matches', MatchSchema)