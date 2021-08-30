import ProjectModel from "../models/Project";

export async function createProject(req, res) {
  const { name, priority, description, deliverydate } = req.body
  try {
    const newProject = await ProjectModel.create({
      name,
      priority,
      description,
      deliverydate
    }, {
      fields: ['name', 'priority', 'description', 'deliverydate']
    })

    if (newProject) return res.json({
      message: 'received',
      data: newProject
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}

export async function getProjects(req, res) {
  try {
    const projects = await ProjectModel.findAll()
    res.json({
      data: projects
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}

export async function getOneProject(req, res) {
  const { id } = req.params
  try {
    const project = await ProjectModel.findOne({
      where: { id }
    })
    res.json({
      data: project
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}

export async function deleteProject(req, res) {
  const { id } = req.params
  try {
    const deleteRowCount = await ProjectModel.destroy({
      where: { id }
    })
    res.json({
      message: 'Project deleted successfully',
      deleted: deleteRowCount
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}

export async function updateProject(req, res) {
  const { id } = req.params
  const { name, priority, description, deliverydate } = req.body

  try {
    const projects = await ProjectModel.findAll({
      attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
      where: { id }
    })

    if (projects.length > 0) {

      projects.forEach(async project => {
        await project.update({
          name,
          priority,
          description,
          deliverydate
        })
      });
      
      return res.json({
        message: 'Project has updated successfully',
        data: projects
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}