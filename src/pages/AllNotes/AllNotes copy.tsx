import {
  NotesList,
  notesListSelector,
  notesListState,
} from "../../recoil/atoms/notesListState";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { ButtonOutline, Container, EmptyMsgBox } from "../../styles/styles";
import { Box, TopBox } from "./AllNotes.styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  modalState,
  toggleTagsModalSelector,
} from "../../recoil/atoms/modalState";
import { FiltersModal } from "../../components";
import useTest from "../../server/hooks/useGetAllNotes";
import getAllNotes from "../../utils/getAllNotes";

const AllNotes = () => {
  const [filter, setFilter] = useState("");
  const { viewFiltersModal } = useRecoilValue(modalState);
  const setToggleFiltersModal = useSetRecoilState(toggleTagsModalSelector);
  const { notesData } = useTest("allNotes");
  const [notesList, setNotesList] = useRecoilState(notesListState);
  const [mainNotes, setMainNotes] = useState<NotesList["mainNotes"]>([]);
  // const mainNotes = notesList.mainNotes || [];

  // const notesList = useRecoilValue(notesListState);
  // const { newList } = useTest("mainNotes");
  // const mainNotes = newList || [];
  // const getNotesList = useRecoilValueLoadable(notesListSelector("mainNotes"));

  // const getNotesList = useRecoilValueLoadable(notesListSelector("mainNotes"));

  useEffect(() => {
    // setMainNotes(notesData);
    console.log("useeffect: ", notesList);
    if (notesList.editNote !== null) {
      setMainNotes(notesList.mainNotes);
    }
  }, [notesList]);

  // console.log(notesList.mainNotes);
  // // const notes = getNotesList.state === "hasValue" && getNotesList.contents;
  // const mainNotes = notesList.mainNotes.length > 0 ? notesList.mainNotes : [];
  // useEffect(() => {
  //   console.log("useEffect");
  //   console.log(mainNotes);
  //   setNotesList(mainNotes);
  // }, [setNotesList]);

  const renderedNotes = useMemo(
    () => getAllNotes(mainNotes, filter),
    [mainNotes, filter]
  );

  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const clearHandler = () => {
    setFilter("");
  };

  return (
    <>
      <Container>
        {viewFiltersModal && (
          <FiltersModal
            handleFilter={filterHandler}
            handleClear={clearHandler}
            filter={filter}
          />
        )}

        {mainNotes?.length < 0 ? (
          <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
        ) : (
          <>
            <TopBox>
              <div className='notes__filter-btn'>
                <ButtonOutline
                  onClick={() =>
                    setToggleFiltersModal({ state: "filter", value: true })
                  }
                  className='nav__btn'
                >
                  <span>정렬</span>
                </ButtonOutline>
              </div>
            </TopBox>
            <Box>{renderedNotes}</Box>
          </>
        )}
      </Container>
    </>
  );
};

export default AllNotes;
