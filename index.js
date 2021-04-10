const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
//? проверка вводимых в консоль значений: console.log(argv)
// TODO: отрефакторил
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts(contactsPath).then(console.table);
      break;

    case "get":
      // ... id
      getContactById(id).then(console.table);
      break;

    case "add":
      // ... name email phone
      addContact(name, email, phone);
      break;

    case "remove":
      // ... id
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
