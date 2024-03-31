import { useState } from "react";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Box, OptionsBox, StyledInput, TopBox } from "./CreateNoteModal.styles";
import { ButtonFill } from "../../../styles/styles";
import { FaTimes } from "react-icons/fa";

import { TagsModal } from "../..";
import { v4 } from "uuid";

import dayjs from "dayjs";
import { Note } from "../../../types/note";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  modalState,
  toggleTagsModalSelector,
} from "../../../recoil/atoms/modalState";
import { editNoteState } from "../../../recoil/atoms/notesListState";
import { toast } from "react-toastify";
import TextEditor from "../../TextEditor/TextEditor";
import useCreateNote from "../../../hooks/useCreateNote";
import { imageToServer } from "../../../server/api";
import SelectBox from "../SelectBox/SelectBox";

const CreateNoteModal = () => {
  const [editNote, setEditNote] = useRecoilState(editNoteState);

  const { viewAddTagsModal } = useRecoilValue(modalState);
  const { asyncCreateNote, asyncEditNote } = useCreateNote();

  const [noteTitle, setNoteTitle] = useState(editNote?.title || "");
  const [value, setValue] = useState(editNote?.content || "");
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [color, setColor] = useState(editNote?.color || "#f1f3f5");
  const [priority, setPriority] = useState(editNote?.priority || "low");
  const setTagsModalState = useSetRecoilState(toggleTagsModalSelector);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const closeCreateNoteModal = () => {
    deleteImage(uploadedImages);
    setTagsModalState({ state: "create", value: false });
    setEditNote(null);
  };

  const deleteImage = (imageUrl: string[]) => {
    if (imageUrl.length > 0) {
      imageUrl.forEach((img) => {
        imageToServer.delete(img);
      });
    }
  };

  const tagsHandler = (tag: string, type: string) => {
    const newTag = tag.toLocaleLowerCase();

    if (type === "add") {
      if (addedTags.length >= 5) {
        toast.error("태그는 5개까지만 추가 가능합니다.");
        return;
      }
      setAddedTags((prev) => [...prev, { tag: newTag, id: v4() }]);
    } else {
      setAddedTags(addedTags.filter(({ tag }) => tag !== newTag));
    }
  };

  const createNoteHandler = () => {
    if (!noteTitle) {
      toast.error("타이틀을 적어 주세요.");
      return;
    } else if (value === "<p><br></p>" || !value) {
      toast.error("글을 작성 해주세요.");
      return;
    }

    const date = dayjs().format("YY/MM/DD h:mm A");

    let note: Note = {
      ...(editNote as Note),
      title: noteTitle,
      content: value,
      tags: addedTags,
      color,
      priority,
      editedTime: date,
    };

    const isEdit = editNote?.id ? "edit" : "create";
    if (isEdit == "edit") {
      asyncEditNote(note);
    } else {
      note = {
        ...note,
        type: "main",
        createdTime: date,
        isPinned: false,
        isRead: false,
        // id: v4(),
      };
      asyncCreateNote(note);
    }
    setTagsModalState({ state: "create", value: false });
    setEditNote(null);
  };

  return (
    <>
      <FixedContainer className='zIndex'>
        {viewAddTagsModal && (
          <TagsModal
            type='add'
            addedTags={addedTags}
            handleTags={tagsHandler}
          />
        )}
        <Box style={{ zIndex: 10 }}>
          <TopBox>
            <div className='createNote_title'>Create Note</div>
            <DeleteBox
              className='createNote__close-btn'
              onClick={closeCreateNoteModal}
            >
              <FaTimes />
            </DeleteBox>
          </TopBox>
          <StyledInput
            type='text'
            placeholder='insert your note'
            name='title'
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <TextEditor
            color={color}
            value={value}
            setValue={setValue}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />

          <OptionsBox>
            <div>
              <SelectBox value={color} setValue={setColor} label={"Color"} />
            </div>

            <div>
              <SelectBox
                value={priority}
                setValue={setPriority}
                label={"Priority"}
              />
            </div>
            <div className='createNote__create-btn'>
              <ButtonFill onClick={createNoteHandler}>
                {editNote ? <span>SAVE</span> : <span>CREATE</span>}
              </ButtonFill>
            </div>
          </OptionsBox>
        </Box>
      </FixedContainer>
    </>
  );
};

export default CreateNoteModal;
