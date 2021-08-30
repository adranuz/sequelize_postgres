import { Router } from 'express'
import { 
  createProject,
  deleteProject,
  getOneProject,
  getProjects, 
  updateProject
} from '../controllers/project.controller'
const router = Router()



//  /api/proyects/
router.post('/', createProject)
router.get('/', getProjects)
router.get('/:id', getOneProject)
router.delete('/:id', deleteProject)
router.put('/:id', updateProject)


export default router