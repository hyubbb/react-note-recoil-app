import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../../types/note";
import notes from "../../notesData";

interface NotesList {
  mainNotes: Note[];
  archiveNotes: Note[];
  trashNotes: Note[];
  editNote: null | Note;
}

const initialState: NotesList = {
  mainNotes: [...notes],
  archiveNotes: [],
  trashNotes: [],
  editNote: null,
};

enum noteType {
  mainNotes = "mainNotes",
  archiveNotes = "archiveNotes",
  trashNotes = "trashNotes",
}

const notesListSlice = createSlice({
  name: "notesList",
  initialState,
  reducers: {
    // note의 생성이나 업데이
    setMainNotes: (state, { payload }) => {
      // 이미 있는 id인지 확인해서 수정
      if (state.mainNotes.find(({ id }) => id === payload.id)) {
        state.mainNotes = state.mainNotes.map((note) =>
          // 일치하는 id가있으면, 새로들어온값입력, 아닐경우 기존값
          note.id === payload.id ? payload : note
        );
      } else {
        // 없으면 새로 생성
        state.mainNotes.push(payload);
      }
    },
    setTrashNotes: (state, { payload }) => {
      // note가 메인에있을수도 있고, archive에 있을수도 있으니 둘다 필터링
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );

      state.trashNotes.push({ ...payload, isPinned: false });
    },
    setArchiveNotes: (state, { payload }) => {
      // main에서 제거
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes.push(payload);
    },
    setEditNote: (state, { payload }) => {
      state.editNote = payload;
    },
    setPinnedNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) =>
        note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
      );
    },
    readNote: (state, { payload }) => {
      /**
       * 단순히 note의 isRead를 true로 바꿔주는 것이지만,
       * mainNotes, archiveNotes, trashNotes 을 구분해줘야한다.
       */
      const { type, id } = payload;
      const setRead = (note: noteType) => {
        state[note] = state[note].map((note: Note) =>
          note.id === id ? { ...note, isRead: !note.isRead } : note
        );
      };

      if (type === "archiveNotes") {
        setRead(noteType.archiveNotes);
      } else if (type === "trashNotes") {
        setRead(noteType.trashNotes);
      } else {
        setRead(noteType.mainNotes);
      }
    },
    unArchiveNote: (state, { payload }) => {
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      state.mainNotes.push({ ...payload });
    },
    restoreNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes.push(payload);
    },
    deleteNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    },

    removeTags: (state, { payload }) => {
      // mainNots안에 있는 모든 note들의 tags를 filter를 통해 payload.tag와 같지 않은 것만 남겨둔다.
      state.mainNotes = state.mainNotes.map((note) => ({
        ...note,
        tags: note.tags.filter((tag) => tag !== payload.tag),
      }));
    },
  },
});

export default notesListSlice.reducer;
export const { removeTags } = notesListSlice.actions;

export const {
  setMainNotes,
  setTrashNotes,
  setArchiveNotes,
  setEditNote,
  setPinnedNotes,
  readNote,
  unArchiveNote,
  restoreNote,
  deleteNote,
} = notesListSlice.actions;
