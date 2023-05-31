import express from 'express';
const router = express.Router();
import { trainingControllers } from '../controllers/trainingControllers.js'

router.get('/', trainingControllers.getTrainings)
router.get('/:id', trainingControllers.getTraining)
router.post('/', trainingControllers.newTraining)
router.put('/:id', trainingControllers.updateTraining)
router.delete('/:id', trainingControllers.deleteTraining)

export default router