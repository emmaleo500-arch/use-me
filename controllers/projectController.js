const { projects } = require('../models/Project');

exports.getProjects = (req, res) => {
  res.json({
    success: true,
    count: projects.length,
    data: projects
  });
};

exports.getProjectById = (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  res.json({
    success: true,
    data: project
  });
};
