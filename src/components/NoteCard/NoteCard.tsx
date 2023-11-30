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
import getRelevantBtns from "../../utils/getRelevantBtns";
import { useAppDispatch } from "../../hooks/redux";
import { readNote, setPinnedNotes } from "../../store/notesList/notesListSlice";
import parse from "html-react-parser";
import { ReadNoteModal } from "..";

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard = ({ note, type }: NoteCardProps) => {
  const { title, content, tags, color, priority, date, isPinned, isRead, id } =
    note;

  const dispatch = useAppDispatch();

  const func = () => {
    const chkImg = content.includes("img src=");
    if (chkImg) {
      return content;
    } else {
      return content.length > 40 ? content.slice(0, 40) + "..." : content;
    }
  };

  return (
    <>
      {isRead && <ReadNoteModal note={note} type={type} />}
      <Card style={{ background: color }}>
        <TopBox>
          <div className='noteCard__title'>
            {title.length > 10 ? title.slice(0, 10) + "..." : title}
          </div>
          <div className='noteCard__top-options'>
            <span className='noteCard__priority'>{priority}</span>
            {type !== "archive" && type !== "trash" && (
              <NotesIconBox
                className='noteCard__pin'
                onClick={() => dispatch(setPinnedNotes({ id }))}
              >
                <BsFillPinFill style={{ color: isPinned ? "red" : "" }} />
              </NotesIconBox>
            )}
            <div className='noteCard__pic'></div>
          </div>
        </TopBox>
        <ContentBox onClick={() => dispatch(readNote({ type, id }))}>
          {parse(func())}
        </ContentBox>
        <TagsBox>
          {tags.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>
        <FooterBox>
          <div className='noteCard__date'>{date}</div>
          <div>{getRelevantBtns(type, note, dispatch)}</div>
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
