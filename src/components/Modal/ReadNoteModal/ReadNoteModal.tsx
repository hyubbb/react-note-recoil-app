import {
  Box,
  ContentBox,
  FooterBox,
  TagsBox,
  TopBox,
} from "./ReadNoteModal.styles";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { FaStar, FaTimes } from "react-icons/fa";
import { Note } from "../../../types/note";
import parse from "html-react-parser";
import { useSetRecoilState } from "recoil";
import { setPinnedSelector } from "../../../recoil/atoms/notesListState";
import { NotesIconBox } from "../../../styles/styles";

import GetRelevantBtns from "../../../utils/getRelevantBtns";
import usePathNameisTag from "../../../utils/usePathNameisTag";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useRef } from "react";

interface ReadNoteModalProps {
  note: Note;
  type: string;
  viewHandler: (props: boolean) => void;
}

const ReadNoteModal = ({ note, type, viewHandler }: ReadNoteModalProps) => {
  const { priority, isPinned, content, tags, date, color } = note;
  const setPinned = useSetRecoilState(setPinnedSelector);
  const ref = useRef<HTMLDivElement>(null);

  const funcPinned = (e: Event) => {
    e.stopPropagation();
    setPinned(note);
  };

  const modalClose = () => {
    viewHandler(false);
  };

  useOnClickOutside({ elm: "readModal", ref, handler: modalClose });
  const isTag = usePathNameisTag();

  const func = () => {
    const chkImg = content.includes("img src=");
    if (chkImg) {
      return content;
    } else {
      return content.length > 40 ? content.slice(0, 40) + "..." : content;
    }
  };

  return (
    <FixedContainer className='readModal'>
      <Box style={{ backgroundColor: color }} ref={ref}>
        <DeleteBox className='readNote__close-btn' onClick={modalClose}>
          <FaTimes />
        </DeleteBox>
        <TopBox color={color}>
          <div className='readNote__title'>{note.title}</div>
          <div className='noteCard__top-options'>
            <span className='noteCard__priority'>{priority}</span>
            {type !== "archive" && type !== "trash" && !isTag && (
              <NotesIconBox
                className='noteCard__pin'
                onClick={(e) => funcPinned(e)}
              >
                <FaStar style={{ color: isPinned ? "red" : "" }} />
              </NotesIconBox>
            )}
          </div>
        </TopBox>
        <ContentBox color={color}>{parse(func())}</ContentBox>
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
