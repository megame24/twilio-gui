'use strict';
module.exports = (sequelize, DataTypes) => {
  var ReadTime = sequelize.define('ReadTime', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    readTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  ReadTime.associate = (models) => {
    ReadTime.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return ReadTime;
};