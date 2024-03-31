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
import { setNotePinSelector } from "../../../recoil/atoms/notesListState";
import { NotesIconBox } from "../../../styles/styles";

import GetRelevantBtns from "../../../utils/getRelevantBtns";
import usePathNameisTag from "../../../utils/usePathNameisTag";
import { useRef } from "react";
import { updateNote } from "../../../server/api";

interface ReadNoteModalProps {
  note: Note;
  type: string;
  viewHandler: (props: boolean) => void;
}

const ReadNoteModal = ({ note, type, viewHandler }: ReadNoteModalProps) => {
  const { priority, isPinned, content, tags, createdTime, color } = note;
  const createTimeFormat = createdTime.slice(0, 10);
  const setPinned = useSetRecoilState(setNotePinSelector);
  const ref = useRef<HTMLDivElement>(null);

  const funcPinned = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateNote.pin(note);
    setPinned(note);
  };

  const modalClose = () => {
    viewHandler(false);
  };

  const isTag = usePathNameisTag();

  const func = () => {
    const chkImg = content.includes("img src=");
    if (chkImg) {
      return content;
    } else {
      return content;
    }
  };

  return (
    <FixedContainer className='readModal'>
      <Box style={{ backgroundColor: color }} ref={ref} className='ql-snow'>
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
        <ContentBox color={color} className='ql-editor'>
          {/* 이전에는 dangerouslySetInnerHTML을 사용하려고 했던 코드 */}
          {parse(func())}
          {/* func 함수의 반환값을 파싱하여 사용 */}
        </ContentBox>

        {/* <TagsBox>
          {tags.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox> */}

        <FooterBox>
          <div className='noteCard__date'>{createTimeFormat}</div>
          <div>{GetRelevantBtns(note)}</div>
        </FooterBox>
      </Box>
    </FixedContainer>
  );
};

export default ReadNoteModal;
