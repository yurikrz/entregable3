import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encrypted-password.plugin.js';
import { generateJWT } from '../../config/plugins/generate-jwt.plugin.js';
import {
  validateUser,
  validatePartialUser,
  validateLogin,
} from './user.schema.js';
import { UserService } from './user.service.js';

export const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserService.findAll();
  return res.status(200).json(users);
});

export const findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  return res.status(200).json(user);
});

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const userSearched = await UserService.findOneUserByEmail(userData.email);

  if (userSearched) {
    return next(
      new AppError(
        `Email address ${userData.email} already in use, please use another email address.`,
        404
      )
    );
  }

  const user = await UserService.create(userData);
  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  //1. traer los datos de la req.body y validar
  const { hasError, errorMessage, userData } = validateLogin(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  //2. validar que el usuario exista en la BD
  const user = await UserService.findOneUserByEmail(userData.email);

  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }

  //3. comparar y comprobar password
  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //4. generar JWT
  const token = await generateJWT(user.id);

  //5. enviar la respuesta al cliente
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const {
    hasError,
    errorMessage,
    userData: { name, email },
  } = validatePartialUser(req.body);
  const { user } = req;

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  if (email) {
    const userSearched = await UserService.findOneUserByEmail(email, user.id);
    if (userSearched) {
      return next(
        new AppError(
          `Email address ${email} already in use, please use another email address.`,
          404
        )
      );
    }
  }

  await UserService.update(user, {
    name,
    email,
  });

  return res
    .status(200)
    .json({ message: 'User has been updated successfully!' });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await UserService.delete(user);
  return res.status(204).json(null);
});
