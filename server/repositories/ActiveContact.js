function ActiveContact() {
  this.activeContacts = {};
}

ActiveContact.prototype.saveOrUpdate = function (id, contactId) {
  this.activeContacts[id] = contactId;
};

ActiveContact.prototype.get = function (id) {
  return this.activeContacts[id];
};

ActiveContact.prototype.clear = function () {
  this.activeContacts = {};
};

module.exports = new ActiveContact();
