/**
 * The the contact list for the specified user alongside
 * Their notifications
 * @param {Number} ownerId user id
 * @returns {Object} an array of contacts
 */
const getContactListWithNotifn = (ownerId) => `
SELECT "id", "name", "phoneNumber", "notifications" FROM (
  SELECT "id", "name", "phoneNumber", "notifications" FROM "Users" LEFT JOIN (
    SELECT "userId", count(*) "notifications" FROM (
      SELECT "readTime", "userId" FROM "ReadTimes"
    ) "readtimes" JOIN "Messages" ON "Messages"."fromId" = "readtimes"."userId" 
      AND "readtimes"."readTime" < "Messages"."createdAt" GROUP BY "userId"
  ) "notificationsTable" ON "notificationsTable"."userId" = "Users"."id"
) "userNotifications" JOIN (
    SELECT "contactId", "ownerId" FROM "Contacts"
  ) "contacts" ON "userNotifications"."id" = "contacts"."contactId"
    AND "contacts"."ownerId" = ${ownerId}`;

module.exports = {
  getContactListWithNotifn,
};
