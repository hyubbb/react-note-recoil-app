import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { NotesIconBox } from "../styles/styles";
import { Note } from "../types/note";
import { useSetRecoilState } from "recoil";
import { setEditNoteSelector } from "../recoil/atoms/notesListState";
import { toggleTagsModalSelector } from "../recoil/atoms/modalState";
import { useMoveToNote } from "../server/hooks/useRemoveNote";
import usePathNameisTag from "./usePathNameisTag";

const GetRelevantBtns = (type: string, note: Note) => {
  const isTag = usePathNameisTag();
  const toggleNoteModal = useSetRecoilState(toggleTagsModalSelector);
  const setEditNote = useSetRecoilState(setEditNoteSelector);

  const { removeAndMove } = useMoveToNote();

  const clickHandler = () => {
    toggleNoteModal({ state: "create", value: true });
    setEditNote(note);
  };

  const stateHandler = (state: string) => {
    const from: string = type === "notes" ? "mainNotes" : type + "Notes";
    if (state === "trashNotes") {
      removeAndMove({ from, state, note });
    } else if (state === "archiveNotes") {
      // setArchiveNotes({ type: state, note });
      removeAndMove({ from, state, note });
    } else if (state === "delete") {
      removeAndMove({ from, state, note });
    } else {
      removeAndMove({ from, state, note });
    }
  };

  if (isTag) {
    return (
      <NotesIconBox onClick={clickHandler} data-info='edit'>
        <FaEdit style={{ fontsize: "1rem" }} />
      </NotesIconBox>
    );
  }

  if (type === "archive") {
    return (
      <>
        {/* data-info is used for tooltip */}
        <NotesIconBox onClick={clickHandler} data-info='edit'>
          <FaEdit style={{ fontsize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => stateHandler("mainNotes")}
          data-info='Unarchive'
        >
          <RiInboxUnarchiveFill style={{ fontsize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => stateHandler("trashNotes")}
          data-info='Delete'
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else if (type === "trash") {
    return (
      <>
        {/* data-info is used for tooltip */}
        <NotesIconBox
          onClick={() => stateHandler("mainNotes")}
          data-info='Restore'
        >
          <FaTrashRestore style={{ fontsize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox onClick={() => stateHandler("delete")} data-info='Delete'>
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
          onClick={() => stateHandler("archiveNotes")}
          data-info='Archive'
        >
          <FaArchive />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => stateHandler("trashNotes")}
          data-info='Delete'
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  }
};

export default GetRelevantBtns;
