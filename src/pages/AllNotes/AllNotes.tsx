import { useRecoilValue, useSetRecoilState } from "recoil";
import { ButtonOutline, Container, EmptyMsgBox } from "../../styles/styles";
import { Box, TopBox } from "./AllNotes.styles";
import { useState } from "react";
import {
  modalState,
  toggleTagsModalSelector,
} from "../../recoil/atoms/modalState";
import { FiltersModal } from "../../components";
import getAllNotes from "../../utils/getAllNotes";

import useGetTypeNote from "../../hooks/useGetTypeNote";
import { notesListState } from "../../recoil/atoms/notesListState";

const AllNotes = () => {
  const [filter, setFilter] = useState("");
  const { viewFiltersModal } = useRecoilValue(modalState);
  const setToggleFiltersModal = useSetRecoilState(toggleTagsModalSelector);
  useGetTypeNote("main");
  const notesData = useRecoilValue(notesListState);
  return (
    <>
      <Container>
        {viewFiltersModal && (
          <FiltersModal
            handleFilter={(e) => setFilter(e.target.value)}
            handleClear={() => setFilter("")}
            filter={filter}
          />
        )}

        {notesData.length == 0 ? (
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
            <Box>{getAllNotes(notesData, filter)}</Box>
          </>
        )}
      </Container>
    </>
  );
};

export default AllNotes;
