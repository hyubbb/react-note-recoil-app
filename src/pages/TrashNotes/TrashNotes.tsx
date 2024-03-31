import { MainWrapper } from "../../components";
import { Container, EmptyMsgBox } from "../../styles/styles";
import { notesListState } from "../../recoil/atoms/notesListState";
import { useRecoilValue } from "recoil";
import useGetTypeNote from "../../hooks/useGetTypeNote";

const TrashNotes = () => {
  useGetTypeNote("trash");
  const notesData = useRecoilValue(notesListState);
  return (
    <>
      <Container>
        {notesData.length === 0 ? (
          <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
        ) : (
          <MainWrapper notes={notesData} type='trash' />
        )}
      </Container>
    </>
  );
};

export default TrashNotes;
