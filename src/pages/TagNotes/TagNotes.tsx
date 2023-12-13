import { useLocation } from "react-router-dom";
import { Note } from "../../types/note";
import { ButtonOutline, Container, EmptyMsgBox } from "../../styles/styles";
import getAllNotes from "../../utils/getAllNotes";
import { Box, TopBox } from "../AllNotes/AllNotes.styles";
// import { FiltersModal } from "../../components";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { notesListState } from "../../recoil/atoms/notesListState";
import {
  modalState,
  toggleTagsModalSelector,
} from "../../recoil/atoms/modalState";
import { FiltersModal } from "../../components";
// import { toggleFiltersModal } from "../../store/modal/modalSlice";

const TagNotes = () => {
  const { mainNotes } = useRecoilValue(notesListState);
  const setToggleFiltersModal = useSetRecoilState(toggleTagsModalSelector);
  const { state: type } = useLocation();
  const [filter, setFilter] = useState("");
  const notes: Note[] = [];

  const { viewFiltersModal } = useRecoilValue(modalState);
  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const clearHandler = () => {
    setFilter("");
  };

  mainNotes.forEach((note) => {
    note.tags.filter(({ tag }) => {
      if (tag === type) {
        notes.push(note);
      }
    });
  });

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
            <Box>{getAllNotes(notes, filter)}</Box>
          </>
        )}
      </Container>
    </>
  );
};

export default TagNotes;
