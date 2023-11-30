import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Box, StyledInput, TagsBox } from "./TagsModal.styles";
import { toggleTagsModal } from "../../../store/modal/modalSlice";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import getStandardName from "../../../utils/getStandardName";
import { v4 } from "uuid";
import { addTags, deleteTags } from "../../../store/tags/tagsSlice";
import { removeTags } from "../../../store/notesList/notesListSlice";
import { Tag } from "../../../types/tag";

interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void;
}

const TagsModal = ({ type, addedTags, handleTags }: TagsModalProps) => {
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector((state) => state.tags);
  const [inputText, setInputText] = useState("");

  const deleteTagHandler = (tag: string, id: string) => {
    dispatch(deleteTags(id));
    dispatch(removeTags({ tag }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText) return;
    dispatch(addTags({ tag: inputText.toLocaleLowerCase(), id: v4() }));
    setInputText("");
  };

  return (
    <FixedContainer>
      <Box>
        <div className='editTags__header'>
          <div className='editTags__title'>
            {type === "add" ? "ADD" : "EDIT"} Tags
          </div>
          <DeleteBox
            className='editTags__close'
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>
        <form onSubmit={submitHandler}>
          <StyledInput
            type='text'
            value={inputText}
            placeholder='new tag...'
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <TagsBox>
          {tagsList?.map(({ tag, id }) => (
            <li key={id}>
              <div className='editTags__tag'>{getStandardName(tag)}</div>
              {type === "edit" ? (
                <DeleteBox onClick={() => deleteTagHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : (
                <DeleteBox>
                  {addedTags?.find(
                    (addedTag) => addedTag.tag === tag.toLowerCase()
                  ) ? (
                    <FaMinus onClick={() => handleTags!(tag, "remove")} /> // interface에서 ?연산자를 사용했지만, 이 경우에서의 함수는 항상 있기 때문에, 타입단언을 해줘야함
                  ) : (
                    <FaPlus onClick={() => handleTags!(tag, "add")} />
                  )}
                </DeleteBox>
              )}
            </li>
          ))}
        </TagsBox>
      </Box>
    </FixedContainer>
  );
};

export default TagsModal;
