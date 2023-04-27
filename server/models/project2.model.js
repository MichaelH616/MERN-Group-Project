const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
        required:[true, "Date is required"]
    },
    completedStatus: {
        type: Boolean
    },
    tasks: [{
        type: String,
    }],
    userOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true},

})

module.exports = mongoose.model("Project2", ProjectSchema);