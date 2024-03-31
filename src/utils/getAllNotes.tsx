import { NoteCard } from "../components";
import { EmptyMsgBox, NotesContainer } from "../styles/styles";
import { Note } from "../types/note";

const parseDate = (dateStr: string): number => {
  const parts = dateStr.match(
    /(\d{2})\/(\d{2})\/(\d{2}) (\d{1,2}):(\d{2}) (AM|PM)/
  );
  if (!parts) return 0; // 매칭되지 않으면 0 반환

  let [, year, month, day, hours, minutes, period] = parts;

  if (period === "PM" && hours !== "12")
    hours = (parseInt(hours, 10) + 12).toString();
  if (period === "AM" && hours === "12") hours = "0";

  // `Date.UTC` 메서드는 숫자 타입의 인자를 기대합니다.
  const date = new Date(
    Date.UTC(
      20,
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    )
  );

  return date.getTime(); // 실패하지 않는 한 항상 숫자 반환
};

const filterNotes = (notes: Note[], filter: string): Note[] => {
  const lowPriority = notes.filter(({ priority }) => priority === "low");
  const highPriority = notes.filter(({ priority }) => priority === "high");

  if (filter === "low") {
    return [...lowPriority, ...highPriority];
  } else if (filter === "high") {
    return [...highPriority, ...lowPriority];
  } else if (filter === "new") {
    return notes.sort(
      (a, b) => parseDate(b.createdTime) - parseDate(a.createdTime)
    );
  } else if (filter === "create") {
    return notes.sort(
      (a, b) => parseDate(a.createdTime) - parseDate(b.createdTime)
    );
  } else if (filter === "edit") {
    const editNote = notes.filter(({ editedTime }) => editedTime);
    const normalNote = notes.filter(({ editedTime }) => !editedTime);
    const sortedNote = editNote.sort(
      (a, b) => parseDate(b.editedTime) - parseDate(a.editedTime)
    );
    return [...sortedNote, ...normalNote];
  } else {
    return notes;
  }
};

const getAllNotes = (
  noteData: Note[],
  filter: string,
  isTag?: boolean,
  type?: string
) => {
  const allNotes = noteData;
  const pinned =
    allNotes.length > 0 ? allNotes.filter(({ isPinned }) => isPinned) : [];
  const normal =
    allNotes.length > 0 ? allNotes.filter(({ isPinned }) => !isPinned) : [];
  // only normal
  if (isTag) {
    return (
      <>
        <div className='allNotes__notes-type'>
          {type} Tag <span>{allNotes.length}</span>
        </div>
        <NotesContainer>
          {filterNotes(allNotes, filter).map((note) => (
            <NoteCard key={note.id} note={note} type='notes' />
          ))}
        </NotesContainer>
      </>
    );
  }

  // both
  if (normal.length !== 0 || pinned.length !== 0) {
    return (
      <>
        <NotesContainer>
          {filterNotes(pinned, filter)?.map((note) => (
            <NoteCard key={note.id} note={note} type='notes' />
          ))}

          {filterNotes(normal, filter).map((note) => (
            <NoteCard key={note.id} note={note} type='notes' />
          ))}
        </NotesContainer>
      </>
    );
  } else {
    return <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>;
  }
};

export default getAllNotes;
