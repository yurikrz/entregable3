import { User } from '../user/user.model.js';
import { Repair } from './repair.model.js';

export class RepairService {
  static async findAll() {
    return await Repair.findAll({
      where: {
        status: ['pending', 'completed'],
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
  }

  static async findOne(id) {
    return await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
  }

  static async create(data) {
    return await Repair.create(data);
  }

  static async update(repair) {
    return await repair.update({
      status: 'completed',
    });
  }

  static async delete(repair) {
    return await repair.update({
      status: 'cancelled',
    });
  }
}
