const Project = require("../models/project.model");

module.exports.createNewProject = (req, res) => {
    Project.create(req.body)
        .then(newlyCreatedProject => {
            res.json({ Project: newlyCreatedProject })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.findAllProjects = ( req, res) => {
    Project.find({})
        .then((projects) => {
            res.json({ Project: projects })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.findOneProject = (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(oneProject => {
            res.json({ Project: oneProject })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.findByMember = (req, res) => {
    Project.find({ member: req.params.member })
        .then(projects => {
            res.json({ Project: projects })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateProject = (req, res) => {
    Project.findOneAndUpdate({ _id: req.params.id },
            req.body,
        { new: true, runValidators: true }
        )
        .then(updatedProject => {
            res.json({ Project: updatedProject })
        }
        )
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        }
        );}

module.exports.deleteProject = (req, res) => {
    Project.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

        
