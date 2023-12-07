import { notesListState } from "../../recoil/atoms/notesListState";
import { Container, EmptyMsgBox } from "../../styles/styles";
import { useRecoilValue } from "recoil";
import { MainWrapper } from "../../components";
import { Box } from "../AllNotes/AllNotes.styles";
import getAllNotes from "../../utils/getAllNotes";
const ArchiveNotes = () => {
  const { archiveNotes } = useRecoilValue(notesListState);
  return (
    <>
      <Container>
        {archiveNotes.length === 0 ? (
          <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
        ) : (
          <>
            {/* <Box>{getAllNotes(archiveNotes, filter)}</Box> */}
            <MainWrapper notes={archiveNotes} type='archive' />
          </>
        )}
      </Container>
    </>
  );
};

export default ArchiveNotes;
