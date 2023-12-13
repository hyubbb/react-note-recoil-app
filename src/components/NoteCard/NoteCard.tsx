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
import {
  readSelector,
  setPinnedSelector,
} from "../../recoil/atoms/notesListState";
import { useSetRecoilState } from "recoil";

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard = ({ note, type }: NoteCardProps) => {
  const { title, content, tags, color, priority, date, isPinned, isRead, id } =
    note;

  const setPinned = useSetRecoilState(setPinnedSelector);
  const setRead = useSetRecoilState(readSelector);
  const func = () => {
    const chkImg = content.includes("img src=");
    if (chkImg) {
      return content;
    } else {
      return content.length > 40 ? content.slice(0, 40) + "..." : content;
    }
  };
  const funcPinned = (e: Event) => {
    e.stopPropagation();
    setPinned(note);
  };

  return (
    <>
      {isRead && <ReadNoteModal note={note} type={type} />}

      <Card style={{ background: color }} onClick={() => setRead({ type, id })}>
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
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
