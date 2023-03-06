const mongoose = require('mongoose')

const StadiumSchema = mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    team: { type: String, required: true },
    capacity: { type: Number, required: true },
    constructionDate: { type: Date | undefined },
    status: { type: String, default: "ACTIVE" },
    cDate: { type: Date, default: Date.now },
    eDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Stadiums', StadiumSchema)