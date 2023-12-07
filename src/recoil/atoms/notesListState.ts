import { atom } from "recoil";
import { Note, singleNote } from "../../types/note";
import notes from "../../notesData";
import { selector } from "recoil";
import { Tag, tagsState } from "../../types/tag";

// 메뉴 상태를 위한 Atom

enum noteType {
  archiveNotes = "archiveNotes",
  trashNotes = "trashNotes",
  mainNotes = "mainNotes",
}

interface NotesList {
  mainNotes: Note[];
  archiveNotes: Note[];
  trashNotes: Note[];
  editNote: Note | null;
}

const initialState: NotesList = {
  mainNotes: [...notes],
  archiveNotes: [],
  trashNotes: [],
  editNote: null,
};

const readInitialState = {
  type: "",
  id: "",
};

const readStateAtom = atom({
  key: "readStateAtom",
  default: readInitialState,
});

export const notesListState = atom({
  key: "notesListState",
  default: initialState,
});

export const tagsAtom = atom({
  key: "tagsAtom",
  default: tagsState,
});

export const singleNoteAtom = atom({
  key: "noteCreateState",
  default: singleNote,
});

export const setMainNotesSelector = selector({
  key: "setMainNotesSelector",
  get: ({ get }) => {
    return get(singleNoteAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentNoteState = get(notesListState);
    const newNote = newValue as Note;

    const isEditOrCreate = currentNoteState.mainNotes.find(
      ({ id }) => id === newNote.id
    );

    let updateNotes;
    if (isEditOrCreate) {
      const addNote = currentNoteState.mainNotes.map((note) =>
        note.id === newNote.id ? newNote : note
      );
      updateNotes = {
        ...currentNoteState,
        mainNotes: [...addNote],
      };
    } else {
      updateNotes = {
        ...currentNoteState,
        mainNotes: [...currentNoteState.mainNotes, newNote],
      };
    }

    set(notesListState, updateNotes);
  },
});

export const setEditNoteSelector = selector({
  key: "setEditNoteSelector",
  get: ({ get }) => {
    return get(notesListState).editNote;
  },
  set: ({ get, set }, newValue) => {
    const newNote = newValue as Note | null;
    const currentState = get(notesListState);
    set(notesListState, { ...currentState, editNote: newNote });
  },
});

export const setPinnedSelector = selector({
  key: "setPinnedSelector",
  get: ({ get }) => {
    return get(singleNoteAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentState = get(notesListState);
    const updatedNotes = checkArrayMap(
      currentState.mainNotes,
      newValue as Note,
      "isPinned"
    );

    set(notesListState, { ...currentState, mainNotes: updatedNotes });
  },
});

const checkArrayMap = (notes: Note[], newValue: Note, type: keyof Note) => {
  return notes.map((note) => {
    return note.id === newValue.id ? { ...note, [type]: !note[type] } : note;
  });
};

export const readSelector = selector({
  key: "readSelector",
  get: ({ get }) => {
    return get(readStateAtom);
  },
  set: ({ get, set }, newValue) => {
    /**
     * mainNotes, archiveNotes, trashNotes 을 구분해줘야한다.
     */

    const currentState = get(notesListState);
    const valueType = newValue as Note;
    let result;
    const setRead = (note: noteType) => {
      return checkArrayMap(currentState[note], newValue as Note, "isRead");
    };

    if (valueType.type === "archive") {
      result = {
        [noteType.archiveNotes]: setRead(noteType.archiveNotes),
      };
    } else if (valueType.type === "trash") {
      result = {
        [noteType.trashNotes]: setRead(noteType.trashNotes),
      };
    } else {
      result = {
        [noteType.mainNotes]: setRead(noteType.mainNotes),
      };
    }
    set(notesListState, { ...currentState, ...result });
  },
});

export const removeTagsSelector = selector({
  key: "removeTagsSelector",
  get: ({ get }) => {
    return get(tagsAtom);
  },
  set: ({ get, set }, newValue) => {
    const { tag } = newValue as Tag;
    const notesList = get(notesListState);
    const removeTagFromNotes = (notes: Note[]) => {
      return notes.map((note) => {
        return {
          ...note,
          tags: note.tags.filter(({ tag: oldTag }) => oldTag !== tag),
        };
      });
    };

    const updateMainNotes = removeTagFromNotes(notesList.mainNotes);
    const updateArchiveNotes = removeTagFromNotes(notesList.archiveNotes);
    const updateTrashNotes = removeTagFromNotes(notesList.trashNotes);

    const updateNotes: NotesList = {
      ...notesList,
      mainNotes: updateMainNotes,
      archiveNotes: updateArchiveNotes,
      trashNotes: updateTrashNotes,
    };

    set(notesListState, updateNotes);
  },
});

export const setArchiveSelector = selector({
  key: "setArchiveSelector",
  get: ({ get }) => {
    return get(singleNoteAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentNoteState = get(notesListState);
    const pathname = window.location.pathname;
    const setNewNote = newValue as Note;

    const toNotes = pathname === "/archive";
    const fromNotes = toNotes
      ? currentNoteState.mainNotes
      : currentNoteState.archiveNotes;
    const toMainNotes = toNotes
      ? currentNoteState.archiveNotes
      : currentNoteState.mainNotes;

    const newMainNotes = toMainNotes.filter(({ id }) => id !== setNewNote.id);
    const newArchiveNotes = [...fromNotes, setNewNote];

    set(notesListState, {
      ...currentNoteState,
      mainNotes: toNotes ? newArchiveNotes : newMainNotes,
      archiveNotes: toNotes ? newMainNotes : newArchiveNotes,
    });
  },
});

export const setTrashSelector = selector({
  key: "setTrashSelector",
  get: ({ get }) => {
    return get(singleNoteAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentNoteState = get(notesListState);
    const pathname = window.location.pathname;
    const setNewNote = newValue as Note;

    const toNotes = pathname === "/trash";
    const fromNotes = toNotes
      ? currentNoteState.mainNotes
      : currentNoteState.trashNotes;
    const toMainNotes = toNotes
      ? currentNoteState.trashNotes
      : currentNoteState.mainNotes;

    const newMainNotes = toMainNotes.filter(({ id }) => id !== setNewNote.id);
    const newArchiveNotes = [...fromNotes, setNewNote];

    set(notesListState, {
      ...currentNoteState,
      mainNotes: toNotes ? newArchiveNotes : newMainNotes,
      trashNotes: toNotes ? newMainNotes : newArchiveNotes,
    });
  },
});

export const removeNoteSelector = selector({
  key: "removeNoteSelector",
  get: ({ get }) => {
    return get(singleNoteAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentState = get(notesListState);
    const removeNote = newValue as Note;

    const newNotes = currentState.trashNotes.filter(
      ({ id }) => id !== removeNote.id
    );

    set(notesListState, { ...currentState, trashNotes: newNotes });
  },
});
