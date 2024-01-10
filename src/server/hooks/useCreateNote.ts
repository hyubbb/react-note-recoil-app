import { AxiosError } from "axios";
import { Note } from "../../types/note";
import { setNoteList, updateNote } from "../api";
import { useSetRecoilState } from "recoil";
import { setMainNotesSelector } from "../../recoil/atoms/notesListState";

const useCreateNote = () => {
  const setCreateNoteState = useSetRecoilState(setMainNotesSelector);
  const pathname = window.location.pathname.includes("archive")
    ? "archiveNotes"
    : "mainNotes";
  const asyncCreateNote = async (note: Note) => {
    try {
      const response = await setNoteList.create(note);
      setCreateNoteState(note);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  };

  const asyncEditNote = async (note: Note) => {
    try {
      const response = await updateNote.update({ note, pathname });
      setCreateNoteState(note);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  };

  return { asyncCreateNote, asyncEditNote };
};

export default useCreateNote;
