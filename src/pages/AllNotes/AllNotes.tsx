import { notesListState } from "../../recoil/atoms/notesListState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ButtonOutline, Container, EmptyMsgBox } from "../../styles/styles";
import { Box, InputBox, TopBox } from "./AllNotes.styles";
import { useState } from "react";
import getAllNotes from "../../utils/getAllNotes";
import {
  modalState,
  toggleTagsModalSelector,
} from "../../recoil/atoms/modalState";
import { FiltersModal } from "../../components";
const AllNotes = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("");
  const { mainNotes } = useRecoilValue(notesListState);

  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const clearHandler = () => {
    setFilter("");
  };

  const { viewFiltersModal } = useRecoilValue(modalState);

  const setToggleFiltersModal = useSetRecoilState(toggleTagsModalSelector);

  return (
    <>
      <Container>
        <>
          {viewFiltersModal && (
            <FiltersModal
              handleFilter={filterHandler}
              handleClear={clearHandler}
              filter={filter}
            />
          )}
        </>
        {mainNotes?.length === 0 ? (
          <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
        ) : (
          <>
            <TopBox>
              <InputBox>
                <input
                  type='text'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder='노트의 제목을 입력해주세요.'
                />
              </InputBox>
              <div className='notes__filter-btn'>
                <ButtonOutline
                  // onClick={() => dispatch(toggleFiltersModal(true))}
                  onClick={() =>
                    setToggleFiltersModal({ state: "filter", value: true })
                  }
                  className='nav__btn'
                >
                  <span>정렬</span>
                </ButtonOutline>
              </div>
            </TopBox>
            <Box>{getAllNotes(mainNotes, filter)}</Box>
          </>
        )}
      </Container>
    </>
  );
};

export default AllNotes;
