import { FaArchive, FaEdit, FaTrash } from "react-icons/fa";
import { NotesIconBox } from "../styles/styles";
import { Note } from "../types/note";
import { useSetRecoilState } from "recoil";
import {
  editNoteState,
  moveNoteSelector,
} from "../recoil/atoms/notesListState";
import { toggleTagsModalSelector } from "../recoil/atoms/modalState";
import { updateNote } from "../server/api";
import { useEffect, useState } from "react";
import usePathNameisTag from "./usePathNameisTag";

const GetRelevantBtns = (note: Note) => {
  const isTag = usePathNameisTag();
  const toggleNoteModal = useSetRecoilState(toggleTagsModalSelector);
  const setEditNote = useSetRecoilState(editNoteState);
  const moveNote = useSetRecoilState(moveNoteSelector);
  const pathname = window.location.pathname;
  const [dataInfo, setDataInfo] = useState({
    edit: "edit",
    archive: "archive",
    trash: "trash",
  });
  useEffect(() => {
    if (pathname.includes("archive")) {
      setDataInfo({ ...dataInfo, archive: "unarchive" });
    }

    if (pathname.includes("trash")) {
      setDataInfo({ edit: "to-main", archive: "to-archive", trash: "delete" });
    }
  }, []);

  const clickHandler = () => {
    if (note.type !== "trash") {
      toggleNoteModal({ state: "create", value: true });
      setEditNote(note);
    } else {
      updateNote.move("main", note.id);
      moveNote(note);
    }
  };
  const archiveHandler = () => {
    let type;
    if (note.type === "trash") {
      type = "archive";
    } else {
      type = note.type === "main" ? "archive" : "main";
    }
    updateNote.move(type, note.id);
    moveNote(note);
  };

  const trashHandler = async () => {
    if (note.type !== "trash") {
      updateNote.move("trash", note.id);
      moveNote(note);
    } else {
      updateNote.delete(note.id);
      moveNote(note);
    }
  };

  if (isTag) {
    return (
      <NotesIconBox onClick={clickHandler} data-info={dataInfo["edit"]}>
        <FaEdit style={{ fontSize: "1rem" }} />
      </NotesIconBox>
    );
  }

  return (
    <>
      {/* data-info is used for tooltip */}
      <NotesIconBox onClick={clickHandler} data-info={dataInfo["edit"]}>
        <FaEdit style={{ fontSize: "1rem" }} />
      </NotesIconBox>
      <NotesIconBox
        onClick={() => archiveHandler()}
        data-info={dataInfo["archive"]}
      >
        <FaArchive />
      </NotesIconBox>
      <NotesIconBox
        onClick={() => trashHandler()}
        data-info={dataInfo["trash"]}
      >
        <FaTrash />
      </NotesIconBox>
    </>
  );
};

export default GetRelevantBtns;
