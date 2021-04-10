const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts(filesPath) {
  const list = await fs.readFile(filesPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    return data;
  });
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const list = await listContacts(contactsPath);
  const itemId = await list.find(({ id }) => id === contactId);
  return itemId;
}

async function removeContact(contactId) {
  const list = await listContacts(contactsPath);
  const listAfterRemove = await list.filter(({ id }) => id !== contactId);
  const listAfterRemoveJSON = JSON.stringify(listAfterRemove);
  const writeList = await fs.writeFile(
    contactsPath,
    listAfterRemoveJSON,
    "utf-8",
    (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
    }
  );
  return writeList;
}

function addContact(name, email, phone) {
  // ...твой код
}

// listContacts(contactsPath).then(console.table);
// getContactById(2).then(console.table);
removeContact(2).then(console.table);

// module.exports = contactsPath;
