import { atom, selectorFamily } from "recoil";
import { Note, singleNote } from "../../types/note";
import { selector } from "recoil";
import { Tag, tagsState } from "../../types/tag";
import { getAllNoteList, setNoteList, updateNote } from "../../server/api";

// 메뉴 상태를 위한 Atom

enum noteType {
  archiveNotes = "archiveNotes",
  trashNotes = "trashNotes",
  mainNotes = "mainNotes",
}

export interface NotesList {
  mainNotes: Note[];
  archiveNotes: Note[];
  trashNotes: Note[];
  editNote: Note | null;
}

const initialState: NotesList = {
  mainNotes: [],
  archiveNotes: [],
  trashNotes: [],
  editNote: null,
};

interface moveToNoteType {
  type: string;
  note: Note;
}

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

export const notesListSelector = selectorFamily({
  key: "notesListSelector",
  get: () => async () => {
    const notesData = await getAllNoteList.getNotes();
    return notesData;
  },
});

export const allNotesListState = selector({
  key: "allNotesListState",
  get: ({ get }) => {
    const result: Note[] = [
      ...get(notesListState).mainNotes,
      ...get(notesListState).archiveNotes,
      ...get(notesListState).trashNotes,
    ];
    return result;
  },
});

export const setNotesSelector = selector({
  key: "setNotesSelector",
  get: ({ get }) => {
    return get(singleNoteAtom);
  },
});

export const setMainNotesSelector = selector<NotesList | Note>({
  key: "setMainNotesSelector",
  get: ({ get }) => {
    return get(notesListState);
  },
  set: ({ get, set }, newValue) => {
    const { id: noteId } = newValue as Note;

    const newNote = newValue as Note;
    const allData = get(notesListState);
    const hasNoteType = allData.mainNotes.filter(({ id }) => id === noteId);
    let updateNotes;

    const pathname = hasNoteType.length > 0 ? "mainNotes" : "archiveNotes";
    const noteTypeData = allData[pathname as keyof NotesList] as Note[];
    const isEdit = noteTypeData.find(({ id }) => id === newNote.id);
    if (isEdit) {
      const addNote = allData[pathname].map((note) =>
        note.id === newNote.id ? newNote : note
      );
      updateNotes = { [pathname]: [...addNote] };
      // updateNote.update({ newNote, pathname });
    } else {
      updateNotes = { mainNotes: [...allData.mainNotes, newNote] };
      // const fetchResult = setNoteList.create(newNote);
    }
    const result = {
      ...allData,
      ...updateNotes,
    };

    set(notesListState, result);
  },
});

export const setMainNotesSelector1 = selectorFamily<NotesList | Note, string>({
  key: "setMainNotesSelector1",
  get:
    () =>
    ({ get }) => {
      return get(notesListState);
    },
  set:
    (pathname) =>
    ({ get, set }, newValue) => {
      const currentNoteState = get(notesListState);
      const noteTypeData = currentNoteState[
        pathname as keyof NotesList
      ] as Note[];
      const newNote = newValue as Note;
      updateNote.update({ newNote, pathname }); // pathname 사용

      let updateNotes;
      const isEdit = noteTypeData.find(({ id }) => id === newNote.id);
      if (isEdit) {
        const addNote = noteTypeData.map((note) =>
          note.id === newNote.id ? newNote : note
        );
        updateNotes = [...addNote];
      } else {
        updateNotes = [...noteTypeData, newNote];
      }
      const result = {
        ...currentNoteState,
        [pathname]: updateNotes,
      };

      set(notesListState, result);
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
    updateNote.pin(newValue as Note);
    set(notesListState, { ...currentState, mainNotes: updatedNotes });
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

    // console.log(updateNotes);
    updateNote.removeTag(updateNotes);

    set(notesListState, updateNotes);
  },
});
