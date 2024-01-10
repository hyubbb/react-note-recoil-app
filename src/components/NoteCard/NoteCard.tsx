import {
  Card,
  ContentBox,
  FooterBox,
  TagsBox,
  TopBox,
} from "./NoteCard.styles";
import { NotesIconBox } from "../../styles/styles";
import { FaStar } from "react-icons/fa";

import { Note } from "../../types/note";
import parse from "html-react-parser";
import ReadNoteModal from "../Modal/ReadNoteModal/ReadNoteModal";
import { setPinnedSelector } from "../../recoil/atoms/notesListState";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import usePathNameisTag from "../../utils/usePathNameisTag";
import GetRelevantBtns from "../../utils/getRelevantBtns";

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard = ({ note, type }: NoteCardProps) => {
  const { title, content, tags, color, priority, date, isPinned } = note;
  const isTag = usePathNameisTag();
  const setPinned = useSetRecoilState(setPinnedSelector);
  const func = () => {
    const chkImg = content.includes("img src=");
    if (chkImg) {
      return content;
    } else {
      return content.length > 40 ? content.slice(0, 40) + "..." : content;
    }
  };
  const funcPinned = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPinned(note);
  };
  const [isView, setIsView] = useState(false);
  const viewHandler = (props: boolean) => {
    setIsView(props);
  };

  return (
    <>
      {isView && (
        <ReadNoteModal note={note} type={type} viewHandler={viewHandler} />
      )}
      <Card style={{ background: color }}>
        <div onClick={() => setIsView(true)}>
          <TopBox color={color}>
            <div className='noteCard__title'>
              {title.length > 10 ? title.slice(0, 10) + "..." : title}
            </div>
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
          {tags.length > 0 && (
            <TagsBox>
              {tags.map(({ tag, id }) => (
                <span key={id}>{tag}</span>
              ))}
            </TagsBox>
          )}
        </div>
        <FooterBox>
          <div className='noteCard__date'>{date}</div>
          <div className='relevantBtn'>{GetRelevantBtns(type, note)}</div>
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
