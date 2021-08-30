import TaskModel from '../models/Task'

export async function createTask(req, res) {
  const { name, done, projectid } = req.body
  try {
    const newTask = await TaskModel.create({
      name,
      done,
      projectid
    }, {
      fields: ['name', 'done', 'projectid']
    })
     
    res.json({
      message: 'received',
      data: newTask
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await TaskModel.findAll()
    res.json({
      data: tasks
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}

export async function getOneTask(req, res) {
  const { id } = req.params
  try {
    const task = await TaskModel.findOne({
      where: { id }
    })
    res.json({
      data: task
    })

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
  
}

export async function deleteTask(req, res) {
  const { id } = req.params
  try {
    const deleteRowCount = await TaskModel.destroy({
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

export async function updateTask(req, res) {
  const { name, done, projectid } = req.body
  const { id } = req.params

  try {
    const tasks = await TaskModel.findAll({
      atrributes: ['id', 'name', 'done', 'projectid' ],
      where: { id }
    })

    if (tasks.length > 0) {
      tasks.forEach(async task => {
        await task.update({
          name, 
          done, 
          projectid
        })
      });
    }
    return res.json({
      message: 'Task has updated successfully',
      data: tasks
    })

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}

export async function getTasksByProject(req, res) {
  const { projectid } = req.params
  try {
    const tasks = await TaskModel.findAll({
      where: { projectid }
    })
    res.json({
      data: tasks
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
      data: {}
    })
  }
}