import express from 'express';
import {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} from './repair.controller.js';
import { validateExistRepair } from './repair.middleware.js';
import { restrictTo } from '../user/user.middleware.js';

export const router = express.Router();

router
  .route('/')
  .get(restrictTo('employee'), findAllRepairs)
  .post(createRepair);

router
  .route('/:id')
  .get(validateExistRepair, restrictTo('employee'), findOneRepair)
  .patch(validateExistRepair, restrictTo('employee'), updateRepair)
  .delete(validateExistRepair, restrictTo('employee'), deleteRepair);
