const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //mongoose gives object an id
    role: {type: String, required: true}
});

module.exports = mongoose.model("Role", roleSchema)