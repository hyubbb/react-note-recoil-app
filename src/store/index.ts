// import { configureStore } from "@reduxjs/toolkit";
// import menuReducer from "./menu/menuSlice";
// import modalReducer from "./modal/modalSlice";
// import notesListReducer from "./notesList/notesListSlice";
// import tagsReducer from "./tags/tagsSlice";

import { atom } from "recoil";
import { Note } from "../types/note";
import notes from "../notesData";

// export const store = configureStore({
//   reducer: {
//     menu: menuReducer,
//     modal: modalReducer,
//     tags: tagsReducer,
//     notesList: notesListReducer, // notesListReducer를 notesList에 할당합니다.
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// 메뉴 상태를 위한 Atom

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
// atoms
export const notesListState = atom({
  key: "notesListState", // 고유한 키
  default: initialState.mainNotes, // 초기 상태
});

export const menuState = atom({
  key: "menuState", // 고유한 키
  default: {}, // 초기 상태 (리덕스의 initialState에 해당)
});

// // 모달 상태를 위한 Atom
// export const modalState = atom({
//   key: "modalState",
//   default: {},
// });

// // 태그 상태를 위한 Atom
// export const tagsState = atom({
//   key: "tagsState",
//   default: {},
// });

// // 노트 리스트 상태를 위한 Atom
// export const notesListState = atom({
//   key: "notesListState",
//   default: [],
// });
