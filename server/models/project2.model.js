const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        // required: [true, "Project name is required"],
        // min: [3, "Project name must be at least 3 characters"]
    },
    description: {
        type: String,
        // required: [true, "Project description is required"]
    },
    dueDate: {
        type: Date,
        required:[true, "Date is required"]
    },
    completedStatus: {
        type: Boolean
        // required: [true, "Is the project completed?"]
    },
    tasks: {
        type: String,
        // required: [true, "Project tasks are required"]
    }
})

module.exports = mongoose.model("Project2", ProjectSchema);