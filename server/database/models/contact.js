'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contact = sequelize.define('Contact', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});

  Contact.associate = (models) => {
    Contact.belongsTo(models.User, {
      as: 'owner',
      foreignKey: 'ownerId',
    });
    Contact.belongsTo(models.User, {
      as: 'contact',
      foreignKey: 'contactId',
    });
  };
  return Contact;
};