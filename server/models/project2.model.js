const mongoose = require('mongoose');

// const taskModel = require('./task.model');
// const userModel = require('./user.model')

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, "Project name is required"],
        min: [2, "Project name must be at least 2 characters"]
    },
    description: {
        type: String,
        required: [true, "Project description is required"]
    },
    dueDate: {
        type: Date,
        required:[true, "Date is required"]

    },
    completedStatus: {
        type: Boolean,
        required: [true, "Is the project completed?"]
    },
    // tasks: [taskModel],
    // users: [userModel]
})

module.exports = mongoose.model("Project2", ProjectSchema);