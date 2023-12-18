import {
  Card,
  ContentBox,
  FooterBox,
  TagsBox,
  TopBox,
} from "./NoteCard.styles";
import { NotesIconBox } from "../../styles/styles";
import { BsFillPinFill } from "react-icons/bs";
import { Note } from "../../types/note";
import parse from "html-react-parser";
import ReadNoteModal from "../Modal/ReadNoteModal/ReadNoteModal";
import { setPinnedSelector } from "../../recoil/atoms/notesListState";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard = ({ note, type }: NoteCardProps) => {
  const { title, content, tags, color, priority, date, isPinned } = note;
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
      <Card style={{ background: color }} onClick={() => setIsView(true)}>
        {/* {isRead && <ReadNoteModal note={note} type={type} />} */}
        {/* <Card style={{ background: color }} onClick={() => setRead({ type, id })}> */}
        <TopBox>
          <div className='noteCard__title'>
            {title.length > 10 ? title.slice(0, 10) + "..." : title}
          </div>
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
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
