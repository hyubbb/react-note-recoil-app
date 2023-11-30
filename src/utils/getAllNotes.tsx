import { NoteCard } from "../components";
import { NotesContainer } from "../styles/styles";
import { Note } from "../types/note";

const filterNotes = (notes: Note[], filter: string) => {
  const lowPriority = notes.filter(({ priority }) => priority === "low");
  const highPriority = notes.filter(({ priority }) => priority === "high");

  if (filter === "low") {
    return [...lowPriority, ...highPriority];
  } else if (filter === "high") {
    return [...highPriority, ...lowPriority];
  } else if (filter === "new") {
    return notes.sort((a, b) => b.createdTime - a.createdTime);
  } else if (filter === "create") {
    return notes.sort((a, b) => a.createdTime - b.createdTime);
  } else if (filter === "edit") {
    const editNote = notes.filter(({ editedTime }) => editedTime);
    const normalNote = notes.filter(({ editedTime }) => !editedTime);
    const sortedNote = editNote.sort(
      (a, b) => (b.editedTime as number) - (a.editedTime as number)
    );
    return [...sortedNote, ...normalNote];
  } else {
    return notes;
  }
};

const getAllNotes = (mainNotes: Note[], filter: string) => {
  const pinned = mainNotes.filter(({ isPinned }) => isPinned);
  const normal = mainNotes.filter(({ isPinned }) => !isPinned);

  // only normal
  if (normal.length !== 0 && pinned.length === 0) {
    return (
      <>
        <div className='allNotes__notes-type'>
          All Notes <span>{normal.length}</span>
        </div>
        <NotesContainer>
          {filterNotes(normal, filter).map((note) => (
            <NoteCard key={note.id} note={note} type='notes' />
          ))}
        </NotesContainer>
      </>
    );
  }

  // only pinned
  if (normal.length === 0 && pinned.length !== 0) {
    return (
      <>
        <div className='allNotes__notes-type'>
          Pinned <span>{pinned.length}</span>
        </div>
        <NotesContainer>
          {filterNotes(pinned, filter).map((note) => (
            <NoteCard key={note.id} note={note} type='notes' />
          ))}
        </NotesContainer>
      </>
    );
  }

  // both
  if (normal.length !== 0 && pinned.length !== 0) {
    return (
      <>
        <div className='allNotes__notes-type'>
          Pinned <span>{pinned.length}</span>
        </div>
        <NotesContainer>
          {filterNotes(pinned, filter).map((note) => (
            <NoteCard key={note.id} note={note} type='notes' />
          ))}
        </NotesContainer>
        <div className='allNotes__notes-type'>
          All Notes <span>{normal.length}</span>
        </div>
        <NotesContainer>
          {filterNotes(normal, filter).map((note) => (
            <NoteCard key={note.id} note={note} type='notes' />
          ))}
        </NotesContainer>
      </>
    );
  }
};

export default getAllNotes;
