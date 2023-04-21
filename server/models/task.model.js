const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: String,
    status: Boolean,
})

module.exports = mongoose.model("Task", TaskSchema);