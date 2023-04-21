const ProjectController = require("../controllers/project.controller");

module.exports = (app) => { 
    app.post('/api/project', ProjectController.createNewProject);
    app.get('/api/projects', ProjectController.findAllProjects);
    app.get('/api/project/:id', ProjectController.findOneProject);
    app.get('/api/projected/:member', ProjectController.findByMember);
    app.delete('/api/projects/:id', ProjectController.deleteProject);
    app.put('/api/projects/:id', ProjectController.updateProject);
}