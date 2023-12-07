import { Box } from "./ReadNoteModal.styles";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { FaTimes } from "react-icons/fa";
import { Note } from "../../../types/note";
import parse from "html-react-parser";
import { useSetRecoilState } from "recoil";
import { readSelector } from "../../../recoil/atoms/notesListState";

interface ReadNoteModalProps {
  note: Note;
  type: string;
}

const ReadNoteModal = ({ note, type }: ReadNoteModalProps) => {
  const setRead = useSetRecoilState(readSelector);
  return (
    <FixedContainer>
      <Box style={{ backgroundColor: note.color }}>
        <DeleteBox
          className='readNote__close-btn'
          onClick={() => setRead({ type, id: note.id })}
        >
          <FaTimes />
        </DeleteBox>
        <div className='readNote__title'>{note.title}</div>
        <div className='readNote__content'>{parse(note.content)}</div>
      </Box>
    </FixedContainer>
  );
};

export default ReadNoteModal;
