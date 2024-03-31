import { MainWrapper } from "../../components";
import { Container, EmptyMsgBox } from "../../styles/styles";
import { useRecoilValue } from "recoil";
import { notesListState } from "../../recoil/atoms/notesListState";
import useGetTypeNote from "../../hooks/useGetTypeNote";
const ArchiveNotes = () => {
  useGetTypeNote("archive");
  const notesData = useRecoilValue(notesListState);
  return (
    <>
      <Container>
        {notesData?.length === 0 ? (
          <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
        ) : (
          <MainWrapper notes={notesData} type='archive' />
        )}
      </Container>
    </>
  );
};

export default ArchiveNotes;
