const fs = require("fs").promises;
const path = require("path");
const Joi = require("joi");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
// ? асинхронная функция вызова всего списка путь к которому указан в аргументе filesPath
// * пример использования: listContacts(contactsPath).then(console.table)
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

// ? асинхронная функция вызова по ID элемента из списка указанного в переменной list
// ? аргумент ID передается в строковом типе
// * пример использования: getContactById('bmuwatsknc8zxfi').then(console.table)
async function getContactById(contactId) {
  const list = await listContacts(contactsPath);
  const itemId = await list.find(({ id }) => id === contactId);
  return itemId;
}

// ? асинхронная функция удаления по ID элемента из списка указанного в переменной list
// ? аргумент ID передается в строковом типе
// * пример использования: // removeContact('bmuwatsknc8zxfi')
async function removeContact(contactId) {
  const list = await listContacts(contactsPath);
  const listAfterRemove = await list.filter(({ id }) => id !== contactId);
  const listAfterRemoveJSON = await JSON.stringify(listAfterRemove);
  const writeList = await fs.writeFile(
    contactsPath,
    listAfterRemoveJSON,
    (err) => {
      if (err) {
        console.error(err.message);
        return;
      } else {
        console.log("The file has been remove!");
      }
    }
  );
  return writeList;
}

// ? асинхронная функция добавления элемента в список указанный в переменной list
// ? значение ID в объекте создаваемого в переменной objId генерируется в виде строки
// ? у функции должен передаваться как минимум 1 из аргументов, что обусловлено проверкой в переменной schemaAdd
// * пример использования: addContact("Mango", "mango@gmail.com", "999-11-99")
async function addContact(name, email, phone) {
  const schemaAdd = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  }).min(1);
  const objId = { id: uniqid() };
  try {
    const { value } = schemaAdd.validate({
      name: name,
      email: email,
      phone: phone,
    });
    const objJoinJSON = { ...objId, ...value };
    const list = await listContacts(contactsPath);
    const resultListJSON = JSON.stringify([...list, objJoinJSON]);
    fs.writeFile(contactsPath, resultListJSON, (err) => {
      if (err) throw err;
      console.log("The contact was appended to file!");
    });
  } catch (err) {
    (err) => console.log(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
