const validator = require("validator");
const yargs = require("yargs");
const utils = require("./notes");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    utils.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    utils.removeNote(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "Listing notes",
  handler() {
    utils.listNotes();
  }
});

yargs.command({
  command: "read",
  describe: "Read a note",
  handler() {
    utils.readNotes;
  }
});

yargs.parse();
