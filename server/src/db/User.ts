const { DataTypes } = require('sequelize');

export default function User(sequelize: any) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.String,
      allowNull: false
    },
    username: {
      type: DataTypes.String,
      allowNull: false
    },
    password: {
      type: DataTypes.String,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.String,
      allowNull: false,
      defaultValue: 'https://sha1vatar.bruvland.com/user.png'
    },
    admin: {
      type: DataTypes.Boolean,
      allowNull: false,
      defaultValue: false
    },
  });

  User.sync();
  return User;
};