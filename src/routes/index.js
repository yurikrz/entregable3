import express from 'express';
import { router as userRoute } from './../modules/user/user.route.js';
import { router as repairRoute } from './../modules/repair/repair.route.js';
import { protect } from '../modules/user/user.middleware.js';

export const router = express.Router();

router.use('/users', userRoute);

router.use(protect);
router.use('/repairs', repairRoute);
