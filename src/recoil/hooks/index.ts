import { selector, useRecoilState } from "recoil";
import { notesListState } from "../atoms/notesListState";

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

  const notes = selector({});
  // 나머지 액션에 대한 함수들...

  return {
    getMainNotes,
    setMainNotes,
    setTrashNotes,
    // 나머지 함수들...
  };
};

export default useUpdateNotesList;
