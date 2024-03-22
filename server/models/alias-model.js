const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Alias = new Schema(
    {
        alias: { type: String, required: true },
        url: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('aliases', Alias)