const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //mongoose gives object an id
    name: {type: String, required: true},
    role: {type: String, required: true}
});

module.exports = mongoose.model("Hero", heroSchema)