const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = [...contacts].find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    let contacts = await listContacts();
    contacts = [...contacts].filter(({ id }) => id !== contactId);
    await reWriteContacts(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    let contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts = [...contacts, newContact];
    await reWriteContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const reWriteContacts = async (contacts) => {
  try {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
