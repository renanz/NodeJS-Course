const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("Note added"));
  } else console.log(chalk.red.inverse("Note title taken"));
};

const removeNote = title => {
  const notes = loadNotes();
  const keepNotes = notes.filter(note => {
    return note.title !== title;
  });

  if (keepNotes.length === notes.length)
    console.log(chalk.red.inverse("No note found!"));
  else {
    saveNotes(keepNotes);
    console.log(chalk.green.inverse("Note removed!"));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync("notes.json");
    return JSON.parse(buffer.toString());
  } catch (err) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));

  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNotes = title => {
  const notes = loadNotes();
  const found = notes.find(note => note.title === title);

  if (found) {
    console.log(chalk.inverse(found.title));
    console.log(found.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNotes
};
