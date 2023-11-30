import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Note } from "../../types/note";
import { ButtonOutline, Container, EmptyMsgBox } from "../../styles/styles";
import getAllNotes from "../../utils/getAllNotes";
import { Box, TopBox } from "../AllNotes/AllNotes.styles";
import { FiltersModal } from "../../components";
import { useState } from "react";
import { toggleFiltersModal } from "../../store/modal/modalSlice";

const TagNotes = () => {
  const { mainNotes } = useAppSelector((state) => state.notesList);
  const { viewFiltersModal } = useAppSelector((state) => state.modal);
  const { state: type } = useLocation();
  const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();
  const notes: Note[] = [];

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
                  onClick={() => dispatch(toggleFiltersModal(true))}
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

  // return (
  //   <Container>
  //     {notes.length === 0 ? (
  //       <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
  //     ) :
  //       (<MainWrapper notes={notes} type={name} />)}
  //   </Container>
  // )
};

export default TagNotes;
