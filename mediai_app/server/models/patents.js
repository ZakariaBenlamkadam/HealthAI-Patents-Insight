const mongoose = require('mongoose')

const PatentSchema = new mongoose.Schema({
    Publication_Number: String,
    Title: String,
    Abstract:String,
    Inventors: String,
    Publication_Date:Date,
    resource:String
})

const PatentModel = mongoose.model("patents", PatentSchema)
module.exports =PatentModel