const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
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

const readNotes = () => {
  console.log("read notes");
};

const listNotes = () => {
  console.log("list notes");
};

module.exports = {
  getNotes,
  addNote,
  removeNote
};
