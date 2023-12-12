import { User } from './user.model.js';
import { Op } from 'sequelize';

export class UserService {
  static async findAll() {
    return await User.findAll({
      attributes: { exclude: ['password', 'status', 'createdAt', 'updatedAt'] },
    });
  }

  static async findOne(id) {
    return await User.findOne({
      where: {
        id,
      },
    });
  }

  static async create(data) {
    return await User.create(data);
  }

  static async update(user, data) {
    return await user.update(data);
  }

  static async delete(user) {
    return await user.update({
      status: 'disabled',
    });
  }

  static async findOneUserByEmail(email, id) {
    if (!id) {
      return await User.findOne({
        where: {
          email,
        },
      });
    } else {
      return await User.findOne({
        where: {
          email,
          [Op.not]: {
            id: id,
          },
        },
      });
    }
  }
}
