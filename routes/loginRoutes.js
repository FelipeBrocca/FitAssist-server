import express from 'express';
const router = express.Router();
import { loginControllers } from '../controllers/loginControllers.js'

// router.get('/', trainingControllers.getTrainings)
// router.get('/:id', trainingControllers.getTraining)
router.post('/', loginControllers.login)
// router.put('/:id', trainingControllers.updateTraining)
// router.delete('/:id', trainingControllers.deleteTraining)

export default router