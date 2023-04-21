const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [2, "Title must be at least 2 characters."]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [2, "Description must be at least 2 characters."]
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    },
    tasks: {
        type: String,
        required: [true, "Tasks are required"],
        minlength: [2, "Tasks must be at least 2 characters."]
    },
    member: {
        type: String,
        required: [true, "Member is required"],
        minlength: [2, "Member must be at least 2 characters."]
    },
    },
    {timestamps: true});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;