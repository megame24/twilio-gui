/**
 * ActiveContact constructor
 * @returns {undefined}
 */
function ActiveContact() {
  this.activeContacts = {};
}

/**
 * Map an active(chat) contact to the id of the logged in user
 * @param {Number} id id of the currently logged in user
 * @param {Number} contactId active contact id
 * @returns {undefined}
 */
ActiveContact.prototype.saveOrUpdate = function (id, contactId) {
  this.activeContacts[id] = contactId;
};

/**
 * Get the active contact id
 * @param {Number} id user id
 * @returns {Number} user id
 */
ActiveContact.prototype.get = function (id) {
  return this.activeContacts[id];
};

/**
 * clear out the ActiveContact object
 * @returns {undefined}
 */
ActiveContact.prototype.clear = function () {
  this.activeContacts = {};
};

module.exports = new ActiveContact();
