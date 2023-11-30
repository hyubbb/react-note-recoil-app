import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { NotesIconBox } from "../styles/styles";
import { Dispatch } from "react";
import { Note } from "../types/note";
import { toggleCreateNoteModal } from "../store/modal/modalSlice";
import {
  deleteNote,
  restoreNote,
  setArchiveNotes,
  setEditNote,
  setTrashNotes,
  unArchiveNote,
} from "../store/notesList/notesListSlice";

const getRelevantBtns = (type: string, note: Note, dispatch: Dispatch) => {
  const clickHandler = () => {
    dispatch(toggleCreateNoteModal(true));
    dispatch(setEditNote(note));
  };

  if (type === "archive") {
    return (
      <>
        {/* data-info is used for tooltip */}
        <NotesIconBox
          onClick={() => dispatch(unArchiveNote(note))}
          data-info='Unarchive'
        >
          <RiInboxUnarchiveFill style={{ fontsize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info='Delete'
        ></NotesIconBox>
      </>
    );
  } else if (type === "trash") {
    return (
      <>
        {" "}
        {/* data-info is used for tooltip */}
        <NotesIconBox
          onClick={() => dispatch(restoreNote(note))}
          data-info='Restore'
        >
          <FaTrashRestore style={{ fontsize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(deleteNote(note))}
          data-info='Delete'
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else {
    return (
      <>
        {/* data-info is used for tooltip */}
        <NotesIconBox onClick={clickHandler} data-info='edit'>
          <FaEdit style={{ fontsize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setArchiveNotes(note))}
          data-info='Archive'
        >
          <FaArchive />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info='Delete'
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  }
};

export default getRelevantBtns;
