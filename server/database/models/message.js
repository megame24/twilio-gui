'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    media: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    toId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      as: 'to',
      foreignKey: 'toId',
    });
    Message.belongsTo(models.User, {
      as: 'from',
      foreignKey: 'fromId',
    });
  };
  return Message;
};