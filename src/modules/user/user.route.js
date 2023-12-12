import express from 'express';
import {
  deleteUser,
  findAllUsers,
  findOneUser,
  login,
  register,
  updateUser,
} from './user.controller.js';
import { protect, validateExistUser } from './user.middleware.js';

export const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.use(protect);
router.get('/', findAllUsers);
router
  .route('/:id')
  .get(validateExistUser, findOneUser)
  .patch(validateExistUser, updateUser)
  .delete(validateExistUser, deleteUser);
