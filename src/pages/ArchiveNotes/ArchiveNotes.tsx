import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { Container, EmptyMsgBox } from "../../styles/styles";
import { MainWrapper } from "../../components";

const ArchiveNotes = () => {
  const { archiveNotes } = useAppSelector((state) => state.notesList);
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
