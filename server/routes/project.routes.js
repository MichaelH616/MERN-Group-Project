const ProjectController = require("../controllers/project.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => { 
    app.post('/api/project', authenticate, ProjectController.createNewProject);
    app.get('/api/projects', authenticate, ProjectController.findAllProjects);
    app.get('/api/projects/:id', authenticate, ProjectController.findOneProject);
    app.get('/api/projected/:member', authenticate, ProjectController.findByMember);
    app.delete('/api/projects/:id', authenticate, ProjectController.deleteProject);
    app.put('/api/project/:id', authenticate, ProjectController.updateProject);
}