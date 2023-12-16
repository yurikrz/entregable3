import { Repair } from '../../modules/repair/repair.model.js';
import { User } from '../../modules/user/user.model.js';

export const initModel = () => {
  User.hasMany(Repair, { foreignKey: 'user_id' });
  Repair.belongsTo(User, { foreignKey: 'user_id' });
};
