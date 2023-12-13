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

interface moveToNoteType {
  type: string;
  note: Note;
}
const readInitialState = {
  type: "",
  id: "",
};

const moveToNoteState: moveToNoteType = {
  type: "",
  note: {
    ...singleNote,
  },
};

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

export const moveToNoteAtom = atom({
  key: "moveToNoteAtom",
  default: moveToNoteState,
});
const readStateAtom = atom({
  key: "readStateAtom",
  default: readInitialState,
});

export const setNotesSelector = selector({
  key: "setNotesSelector",
  get: ({ get }) => {
    return get(notesListState);
  },
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

const checkArrayMap = (notes: Note[], newValue: Note, type: keyof Note) => {
  return notes.map((note) => {
    return note.id === newValue.id ? { ...note, [type]: !note[type] } : note;
  });
};

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

const moveNotes = (
  type: string,
  noteState: NotesList,
  noteName: keyof NotesList,
  setNewNote: Note
) => {
  const pathname =
    window.location.pathname.length > 1 ? window.location.pathname : "/main";

  // main에서 ->archive냐 ->trash냐 구분
  // main이 아닌곳으로 보내는 경우는 archive->trash 로 가는 경우 밖에 없으므로
  // isMain으로 구분
  // const unState = noteName.includes(pathname.slice(1, pathname.length));

  // // const isMain =
  // //   pathname.includes("archive") && type === "trash"
  // //     ? "archiveNotes"
  // //     : "mainNotes";

  const isMain: keyof NotesList =
    pathname.includes("archive") && type === "trash"
      ? "archiveNotes"
      : "mainNotes";
  const unState = noteName.includes(pathname.slice(1, pathname.length));

  const fromNotes = unState ? noteState[noteName] : noteState[isMain];
  const toNotes = unState ? noteState[isMain] : noteState[noteName];

  let stayNotes = [] as Note[];
  let changeNotes = [] as Note[];

  if (fromNotes) {
    const fromNotesArray = Array.isArray(fromNotes) ? fromNotes : [fromNotes];
    let toNotesArray = [] as Note[];
    if (toNotes !== null && !Array.isArray(toNotes)) {
      toNotesArray = [toNotes];
    }
    // const toNotesArray = toNotes === null ? [] : toNotes;
    stayNotes = fromNotesArray.filter(({ id }) => id !== setNewNote.id);
    changeNotes = [...toNotesArray, setNewNote];
  }

  // let stayNotes,
  //   changeNotes = null;
  // if (fromNotes) {
  //   stayNotes = fromNotes.filter(({ id }) => id !== setNewNote.id);
  //   changeNotes = [...toNotes, setNewNote];
  // }

  return {
    ...noteState,
    [isMain]: unState ? changeNotes : stayNotes,
    [noteName]: unState ? stayNotes : changeNotes,
  };
};

export const setArchiveSelector = selector({
  key: "setArchiveSelector",
  get: ({ get }) => {
    return get(moveToNoteAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentNoteState = get(notesListState);
    const { type, note: setNewNote } = newValue as moveToNoteType;
    const result = { ...setNewNote, isRead: !setNewNote.isRead };

    const a = moveNotes(type, currentNoteState, "archiveNotes", result);
    set(notesListState, a);
  },
});

export const setTrashSelector = selector({
  key: "setTrashSelector",
  get: ({ get }) => {
    return get(moveToNoteAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentNoteState = get(notesListState);
    const { type, note: setNewNote } = newValue as moveToNoteType;
    const result = { ...setNewNote, isRead: !setNewNote.isRead };
    const a = moveNotes(type, currentNoteState, "trashNotes", result);

    set(notesListState, a);
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
