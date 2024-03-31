import { DefaultValue, atom, selectorFamily } from "recoil";
import { Note } from "../../types/note";
import { selector } from "recoil";
import { Tag, tagsState } from "../../types/tag";
import { getAllNoteList } from "../../server/api";
export interface NotesList extends Note {
  note: Note;
  type: string;
}

export const notesListState = atom<Note[]>({
  key: "notesListState",
  default: [],
});

export const editNoteState = atom<Note | null>({
  key: "editNoteState",
  default: null,
});

export const tagsAtom = atom<Tag>({
  key: "tagsAtom",
  default: tagsState,
});

export const notesListSelector = selectorFamily<Note[], string>({
  key: "notesListSelector",
  get: (type) => async () => {
    const notesData = await getAllNoteList.getNotes(type);
    return notesData;
  },
});

export const notesTypeSelector = selector({
  key: "notesListSelector",
  get: ({ get }) => {
    return get(notesListState);
  },
  set: ({ set }, newValue) => {
    set(notesListState, newValue);
  },
});

export const setNotesSelector = selector<Note | undefined>({
  key: "setNotesSelector",
  get: () => {
    return undefined;
  },
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "undefined" || newValue instanceof DefaultValue) {
      console.error("newValue is undefined");
      return;
    }

    const note = newValue as Note;
    const allData = get(notesListState);
    const chk = allData.filter((data) => data.id === note.id);
    let newNotes;
    if (chk.length > 0) {
      newNotes = allData.map((data) => (data.id === note.id ? note : data));
    } else {
      newNotes = [...allData, note];
    }
    set(notesListState, newNotes);
  },
});

export const setEditNoteSelector = selector<Note | null>({
  key: "setEditNoteSelector",
  get: ({ get }) => {
    return get(editNoteState);
  },
  set: ({ set }, newValue) => {
    set(editNoteState, newValue);
  },
});

export const setNotePinSelector = selector<Note | undefined>({
  key: "setNotePinSelector",
  get: () => {
    return undefined;
  },
  set: ({ get, set }, newValue) => {
    const notes = get(notesListState);
    const { id } = newValue as Note;
    const newNote = notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );

    set(notesListState, newNote);
  },
});

export const moveNoteSelector = selector<Note | undefined>({
  key: "moveNoteSelector",
  get: () => {
    return undefined;
  },
  set: ({ get, set }, newValue) => {
    const { id: noteId } = newValue as Note;
    const getNotes = get(notesListState);
    const newNotes = getNotes.filter(({ id }) => id !== noteId);
    set(notesListState, newNotes);
  },
});
