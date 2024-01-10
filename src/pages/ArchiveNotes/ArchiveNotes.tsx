import { Container, EmptyMsgBox } from "../../styles/styles";
import { MainWrapper } from "../../components";
import useGetAllNotes from "../../server/hooks/useGetAllNotes";
const ArchiveNotes = () => {
  const { notesData } = useGetAllNotes("archiveNotes");
  const archiveNotes = notesData.archiveNotes || [];

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
