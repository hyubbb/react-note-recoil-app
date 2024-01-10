import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { notesListState, NotesList } from "../../recoil/atoms/notesListState";
import { Note } from "../../types/note";

export const useMoveToNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notesList, setNotesList] = useRecoilState(notesListState);

  interface moveToNoteType {
    from: string;
    state: string;
    note: Note;
  }

  const removeAndMove = async ({ from, state: to, note }: moveToNoteType) => {
    try {
      let result, newFrom, newNotes;
      if (to === "delete") {
        await axios.delete(`http://localhost:3100/api/note/delete/${note.id}`);

        newFrom = (notesList.trashNotes as Note[]).filter(
          (n) => n.id !== note.id
        );

        result = {
          ...notesList,
          trashNotes: newFrom,
        };
      } else {
        await axios.post(`http://localhost:3100/api/note/move/${to}`, {
          from,
          note,
        });
        // await axios.delete(`http://localhost:3100/remove/${from}/${note.id}`);
        newFrom = (notesList[from] as Note[]).filter((n) => n.id !== note.id);

        newNotes = [...(notesList[to] as Note[]), note];
        result = {
          ...notesList,
          [from]: newFrom,
          [to]: newNotes,
        };
      }

      setNotesList(result);

      // return response.data;

      // const a = useRecoilValue(notesListState);
      // const removeAndMove = async (from, state, note) => {
      //   try {
      //     if (lNotes") {
      //       const resMain = await axios.get(`http://localhost:3001/mainNotes`);
      //       const resArchive = await axios.get(
      //         `http://localhost:3001/archiveNotes`
      //       );
      //       const resTrash = await axios.get(`http://localhost:3001/trashNotes`);
      //       response = {
      //         mainNotes: resMain.data,
      //         archiveNotes: resArchive.data,
      //         trashNotes: resTrash.data,
      //       };
      //     } else {
      //       console.log(type);
      //       response = await axios.get(`http://localhost:3001/${type}`);
      //     }

      //     const newNotes = { ...response };
      //     return newNotes;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { removeAndMove, loading, error };
};
