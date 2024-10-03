import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('user_info', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
  createdAt: 'account_created',
  updatedAt: 'account_updated',
});

export default User;
