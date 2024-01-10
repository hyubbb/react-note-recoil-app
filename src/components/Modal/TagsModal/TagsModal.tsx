import React, { useState } from "react";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Box, StyledInput, TagsBox } from "./TagsModal.styles";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import getStandardName from "../../../utils/getStandardName";
import { v4 } from "uuid";
import { Tag } from "../../../types/tag";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  tagsListSelector,
  tagsListState,
} from "../../../recoil/atoms/tagsListState";
import { toggleTagsModalSelector } from "../../../recoil/atoms/modalState";
import { removeTagsSelector } from "../../../recoil/atoms/notesListState";

interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void;
}

const TagsModal = ({ type, addedTags, handleTags }: TagsModalProps) => {
  const [inputText, setInputText] = useState("");
  const setTagsModalState = useSetRecoilState(toggleTagsModalSelector);
  const setRemoveToNoteTags = useSetRecoilState(removeTagsSelector);
  const setTagsState = useSetRecoilState(tagsListSelector);
  const { tagsList } = useRecoilValue(tagsListState);

  const deleteTagHandler = (tag: Tag): void => {
    setTagsState({ type: "delete", tagsList: [tag] });
    setRemoveToNoteTags(tag);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!inputText) return;
    const newTag: Tag = {
      tag: inputText.toLocaleLowerCase(),
      id: v4(),
    };
    setTagsState({ type: "add", tagsList: [newTag] });
    setInputText("");
  };

  return (
    <FixedContainer className='tagModal'>
      <Box>
        <div className='editTags__header'>
          <div className='editTags__title'>
            {type === "add" ? "ADD" : "EDIT"} Tags
          </div>
          <DeleteBox
            className='editTags__close'
            onClick={() => setTagsModalState({ state: type, value: false })}
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
          {tagsList &&
            tagsList?.map(({ tag, id }, idx) => (
              <li key={id}>
                <div className='editTags__tag'>{getStandardName(tag)}</div>
                {type === "edit" ? (
                  <DeleteBox onClick={() => deleteTagHandler(tagsList[idx])}>
                    <FaTimes />
                  </DeleteBox>
                ) : (
                  <DeleteBox>
                    {addedTags?.find(
                      (addedTag) => addedTag.tag === tag.toLowerCase()
                    ) ? (
                      <FaMinus onClick={() => handleTags!(tag, "remove")} />
                    ) : (
                      // interface에서 ?연산자를 사용했지만, 이 경우에서의 함수는 항상 있기 때문에, 타입단언을 해줘야함
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
