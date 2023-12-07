import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { NotesIconBox } from "../styles/styles";
import { Note } from "../types/note";
import { useSetRecoilState } from "recoil";
import {
  removeNoteSelector,
  setArchiveSelector,
  setEditNoteSelector,
  setTrashSelector,
} from "../recoil/atoms/notesListState";
import { toggleTagsModalSelector } from "../recoil/atoms/modalState";

const GetRelevantBtns = (type: string, note: Note) => {
  const toggleNoteModal = useSetRecoilState(toggleTagsModalSelector);
  const setArchiveNotes = useSetRecoilState(setArchiveSelector);
  const setTrashNotes = useSetRecoilState(setTrashSelector);
  const setEditNote = useSetRecoilState(setEditNoteSelector);
  const deleteNote = useSetRecoilState(removeNoteSelector);

  const clickHandler = () => {
    toggleNoteModal({ state: "create", value: true });
    setEditNote(note);

    // dispatch(toggleCreateNoteModal(true));
  };

  if (type === "archive") {
    return (
      <>
        {/* data-info is used for tooltip */}
        <NotesIconBox
          // onClick={() => dispatch(unArchiveNote(note))}
          onClick={() => setArchiveNotes(note)}
          data-info='Unarchive'
        >
          <RiInboxUnarchiveFill style={{ fontsize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox data-info='Delete'></NotesIconBox>
      </>
    );
  } else if (type === "trash") {
    return (
      <>
        {" "}
        {/* data-info is used for tooltip */}
        <NotesIconBox onClick={() => setTrashNotes(note)} data-info='Restore'>
          <FaTrashRestore style={{ fontsize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox onClick={() => deleteNote(note)} data-info='Delete'>
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
        <NotesIconBox onClick={() => setArchiveNotes(note)} data-info='Archive'>
          <FaArchive />
        </NotesIconBox>
        <NotesIconBox onClick={() => setTrashNotes(note)} data-info='Delete'>
          <FaTrash />
        </NotesIconBox>
      </>
    );
  }
};

export default GetRelevantBtns;
