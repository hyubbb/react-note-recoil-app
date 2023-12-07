import { useRecoilValue } from "recoil";
import { MainWrapper } from "../../components";
import { Container, EmptyMsgBox } from "../../styles/styles";
import { notesListState } from "../../recoil/atoms/notesListState";

const TrashNotes = () => {
  const { trashNotes } = useRecoilValue(notesListState);
  return (
    <>
      <Container>
        {trashNotes.length === 0 ? (
          <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
        ) : (
          <MainWrapper notes={trashNotes} type='trash' />
        )}
      </Container>
    </>
  );
};

export default TrashNotes;
