import express from 'express';
const router = express.Router();
import { environmentControllers } from '../controllers/environmentControllers.js'

router.get('/', environmentControllers.getEnvironments)
router.get('/:id', environmentControllers.getEnvironment)
router.post('/', environmentControllers.newEnvironment)
router.put('/:id', environmentControllers.updateEnvironment)
router.delete('/:id', environmentControllers.deleteEnvironment)

export default router