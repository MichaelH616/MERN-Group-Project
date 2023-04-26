const ProjectController = require("../controllers/project.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => { 
    app.post('/api/project',  ProjectController.createNewProject);
    app.get('/api/projects',  ProjectController.findAllProjects);
    app.get('/api/project/:id', authenticate, ProjectController.findOneProject);
    app.get('/api/projected/:member', authenticate, ProjectController.findByMember);
    app.delete('/api/projects/:id', authenticate, ProjectController.deleteProject);
    app.put('/api/projects/:id',  ProjectController.updateProject);
}