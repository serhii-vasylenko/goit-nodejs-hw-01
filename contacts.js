const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = [...contacts].find(({ id }) => id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  let contacts = await listContacts();
  contacts = [...contacts].filter(({ id }) => id !== contactId);
  await reWriteContacts(contacts);
  return contacts;
};

const addContact = async (name, email, phone) => {
  let contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts = [...contacts, newContact];
  await reWriteContacts(contacts);
  return newContact;
};

const reWriteContacts = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
