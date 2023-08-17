const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //mongoose gives object an id
    name: String,
    role: String
});

module.exports = mongoose.model("Hero", heroSchema)