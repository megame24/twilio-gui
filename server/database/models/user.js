'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});

  User.associate = (models) => {
    User.hasOne(models.ReadTime, {
      as: 'ReadTime',
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
    User.hasMany(models.Message, {
      foreignKey: 'toId',
      as: 'to',
    });
    User.hasMany(models.Message, {
      foreignKey: 'fromId',
      as: 'from',
    });
    User.hasMany(models.Contact, {
      as: 'owner',
      foreignKey: 'ownerId',
    });
    User.hasMany(models.Contact, {
      as: 'contact',
      foreignKey: 'contactId',
    });
  };
  return User;
};
