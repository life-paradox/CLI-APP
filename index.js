const contactsModule = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsModule.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contactById = await contactsModule.getContactById(id);
      console.log(contactById);
      break;

    case 'add':
      const newContact = await contactsModule.addContact(email, name, phone);
      console.log(newContact);
      break;

    case 'remove':
      const deleteContact = await contactsModule.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
