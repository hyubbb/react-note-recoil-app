import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../../types/note";
import notes from "../../notesData";
import { atom } from "recoil";

import { selector } from "recoil";

// export const getAllNotesData = selector({
//   key: "getAllNotesData",
//   get: ({ get }) => {
//     const getAllNotesData = get(initialState.mainNotes);
//     return getAllNotesData;
//   },
// });
// hooks

import { useRecoilState } from "recoil";
import { notesListState } from "../index";

const useUpdateNotesList = () => {
  const [notesList, setNotesList] = useRecoilState(notesListState);
  const getMainNotes = () => {
    return notesList;
  };

  const setMainNotes = (payload) => {
    setNotesList(payload);
    // 로직 구현
  };

  const setTrashNotes = (payload) => {
    // 로직 구현
  };

  // 나머지 액션에 대한 함수들...

  return {
    getMainNotes,
    setMainNotes,
    setTrashNotes,
    // 나머지 함수들...
  };
};

export default useUpdateNotesList;
