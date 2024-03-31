import { AxiosError } from "axios";
import { Note } from "../types/note";
import { setNoteList, updateNote } from "../server/api";
import { useSetRecoilState } from "recoil";
import {
  setNoteEditSelector,
  setNotesSelector,
} from "../recoil/atoms/notesListState";

const useCreateNote = () => {
  const setCreateNoteState = useSetRecoilState(setNotesSelector);
  // const setEditNoteState = useSetRecoilState(setNoteEditSelector);
  const asyncCreateNote = async (note: Note) => {
    try {
      const response = await setNoteList.create(note);
      const { noteId } = response;
      const newData = { ...note, id: noteId } as Note;
      setCreateNoteState(newData);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  };

  const asyncEditNote = async (note: Note) => {
    console.log("editt");
    try {
      await updateNote.update(note);
      setCreateNoteState(note);
      // setEditNoteState(note);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  };

  return { asyncCreateNote, asyncEditNote };
};

export default useCreateNote;
