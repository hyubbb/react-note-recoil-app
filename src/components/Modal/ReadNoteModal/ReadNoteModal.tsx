import { Box, TagsBox, TopBox } from "./ReadNoteModal.styles";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { FaTimes } from "react-icons/fa";
import { Note } from "../../../types/note";
import parse from "html-react-parser";
import { useSetRecoilState } from "recoil";
import {
  readSelector,
  setPinnedSelector,
} from "../../../recoil/atoms/notesListState";
import { NotesIconBox } from "../../../styles/styles";
import { BsFillPinFill } from "react-icons/bs";
import { ContentBox, FooterBox } from "../../NoteCard/NoteCard.styles";
import GetRelevantBtns from "../../../utils/getRelevantBtns";

interface ReadNoteModalProps {
  note: Note;
  type: string;
}

const ReadNoteModal = ({ note, type }: ReadNoteModalProps) => {
  const setRead = useSetRecoilState(readSelector);
  const { priority, isPinned, content, tags, date } = note;
  const setPinned = useSetRecoilState(setPinnedSelector);
  const funcPinned = (e: Event) => {
    e.stopPropagation();
    setPinned(note);
  };

  const func = () => {
    const chkImg = content.includes("img src=");
    if (chkImg) {
      return content;
    } else {
      return content.length > 40 ? content.slice(0, 40) + "..." : content;
    }
  };
  return (
    <FixedContainer className='low'>
      <Box style={{ backgroundColor: note.color }}>
        <DeleteBox
          className='readNote__close-btn'
          onClick={() => setRead({ type, id: note.id })}
        >
          <FaTimes />
        </DeleteBox>
        <TopBox>
          <div className='readNote__title'>{note.title}</div>
          <div className='noteCard__top-options'>
            <span className='noteCard__priority'>{priority}</span>
            {type !== "archive" && type !== "trash" && (
              <NotesIconBox
                className='noteCard__pin'
                onClick={(e) => funcPinned(e)}
              >
                <BsFillPinFill style={{ color: isPinned ? "red" : "" }} />
              </NotesIconBox>
            )}
            {/* <div className='noteCard__pic'></div> */}
          </div>
        </TopBox>
        <ContentBox>{parse(func())}</ContentBox>
        <TagsBox>
          {tags.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>

        <FooterBox>
          <div className='noteCard__date'>{date}</div>
          <div>{GetRelevantBtns(type, note)}</div>
        </FooterBox>
      </Box>
    </FixedContainer>
  );
};

export default ReadNoteModal;
