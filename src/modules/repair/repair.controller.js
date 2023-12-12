import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { UserService } from '../user/user.service.js';
import { validateRepair } from './repair.schema.js';
import { RepairService } from './repair.service.js';

export const findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await RepairService.findAll();
  return res.status(200).json(repairs);
});

export const findOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  return res.status(200).json(repair);
});

export const createRepair = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, repairData } = validateRepair(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const user = await UserService.findOne(repairData.userId);
  if (!user) {
    return next(
      new AppError(`User with id ${repairData.userId} not found!.`, 404)
    );
  }

  const repair = await RepairService.create(repairData);

  return res.status(201).json(repair);
});

export const updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await RepairService.update(repair);

  return res
    .status(200)
    .json({ message: 'Repair has been updated successfully!' });
});

export const deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await RepairService.delete(repair);
  return res.status(204).json(null);
});
