import { useLocation } from "react-router-dom";
import { Note } from "../../types/note";
import { ButtonOutline, Container, EmptyMsgBox } from "../../styles/styles";
import getAllNotes from "../../utils/getAllNotes";
import { Box, TopBox } from "../AllNotes/AllNotes.styles";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  modalState,
  toggleTagsModalSelector,
} from "../../recoil/atoms/modalState";
import { FiltersModal } from "../../components";

const TagNotes = () => {
  // const allNotes = useRecoilValue(allNotesListState);
  const allNotes = [];
  const setToggleFiltersModal = useSetRecoilState(toggleTagsModalSelector);
  const { state: type, pathname } = useLocation();
  const isTag = pathname.includes("tag");
  const [filter, setFilter] = useState("");
  const notes: Note[] = [];
  const { viewFiltersModal } = useRecoilValue(modalState);
  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const clearHandler = () => {
    setFilter("");
  };

  if (type !== "all") {
    allNotes.forEach((note) => {
      note.tags.filter(({ tag }) => tag === type && notes.push(note));
    });
  } else {
    notes.push(...allNotes);
  }

  return (
    <>
      {viewFiltersModal && (
        <FiltersModal
          handleFilter={filterHandler}
          handleClear={clearHandler}
          filter={filter}
        />
      )}

      <Container>
        {notes.length === 0 ? (
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
            <Box>{getAllNotes(notes, filter, isTag, type)}</Box>
          </>
        )}
      </Container>
    </>
  );
};

export default TagNotes;
