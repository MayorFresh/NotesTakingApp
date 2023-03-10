const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user_email: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String,
    }
}, {timestamps: true})

// creating a collection called notes in the database where it stores users notes
const Note = mongoose.model("notes", noteSchema)

module.exports = Note