import express from 'express';
const router = express.Router();
import { userControllers } from '../controllers/userControllers.js'

router.get('/', userControllers.getUsers)
router.get('/:id', userControllers.getUser)
router.post('/', userControllers.newUser)
router.put('/:id', userControllers.updateUser)
router.delete('/:id', userControllers.deleteUser)

export default router;