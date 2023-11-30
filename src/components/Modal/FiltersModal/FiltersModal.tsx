import React from "react";
import { Box, Container, TopBox } from "./FiltersModal.styles";
import { useAppDispatch } from "../../../hooks/redux";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { FaTimes } from "react-icons/fa";
import { toggleFiltersModal } from "../../../store/modal/modalSlice";
interface FiltersModalProps {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  filter: string;
}

const FiltersModal = ({
  handleFilter,
  handleClear,
  filter,
}: FiltersModalProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <FixedContainer>
        <Container>
          <DeleteBox
            onClick={() => dispatch(toggleFiltersModal(false))}
            className='filters__close'
          >
            <FaTimes />
          </DeleteBox>
          <TopBox>
            <div className='filters__title'>정렬</div>
            <small onClick={handleClear} className='filters__delete'>
              clear
            </small>
          </TopBox>
          <Box>
            <div className='filters__subtitle'>PRIORITY</div>
            <div className='filters__check'>
              <input
                type='radio'
                name='filter'
                id='low'
                value='low'
                checked={filter === "low"}
                onChange={(e) => handleFilter(e)}
              />
              <label htmlFor='low'>낮음</label>
            </div>
            <div className='filters__check'>
              <input
                type='radio'
                name='filter'
                id='high'
                value='high'
                checked={filter === "high"}
                onChange={(e) => handleFilter(e)}
              />
              <label htmlFor='high'>높음</label>
            </div>
          </Box>
          <Box>
            <div className='filters__subtitle'>DATE</div>
            <div className='filters__check'>
              <input
                type='radio'
                name='DATE'
                id='latest'
                value='new'
                checked={filter === "new"}
                onChange={(e) => handleFilter(e)}
              />
              <label htmlFor='latest'>Sort by Latest</label>
            </div>
            <div className='filters__check'>
              <input
                type='radio'
                name='DATE'
                id='created'
                value='create'
                checked={filter === "create"}
                onChange={(e) => handleFilter(e)}
              />
              <label htmlFor='created'>Sort by Created</label>
            </div>
            <div className='filters__check'>
              <input
                type='radio'
                name='DATE'
                id='edited'
                value='edit'
                checked={filter === "edit"}
                onChange={(e) => handleFilter(e)}
              />
              <label htmlFor='edited'>Sort by Edited</label>
            </div>
          </Box>
        </Container>
      </FixedContainer>
    </>
  );
};

export default FiltersModal;
