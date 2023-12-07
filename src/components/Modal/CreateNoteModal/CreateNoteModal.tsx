import { useState } from "react";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import {
  AddedTagsBox,
  Box,
  OptionsBox,
  StyledInput,
  TopBox,
} from "./CreateNoteModal.styles";
import { ButtonFill, ButtonOutline } from "../../../styles/styles";
import { FaTimes } from "react-icons/fa";

import { TagsModal } from "../..";
import { v4 } from "uuid";

import dayjs from "dayjs";
import { Note } from "../../../types/note";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  modalState,
  toggleTagsModalSelector,
} from "../../../recoil/atoms/modalState";
import {
  notesListState,
  setMainNotesSelector,
} from "../../../recoil/atoms/notesListState";
import { toast } from "react-toastify";
import TextEditor from "../../TextEditor/TextEditor";

const CreateNoteModal = () => {
  const { editNote } = useRecoilValue(notesListState);
  const { viewAddTagsModal } = useRecoilValue(modalState);
  const [noteTitle, setNoteTitle] = useState(editNote?.title || "");
  const [value, setValue] = useState(editNote?.content || "");
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [noteColor, setNoteColor] = useState(editNote?.color || "");
  const [priority, setPriority] = useState(editNote?.priority || "low");

  const setTagsModalState = useSetRecoilState(toggleTagsModalSelector);
  const setCreateNoteState = useSetRecoilState(setMainNotesSelector);
  const closeCreateNoteModal = () => {
    setTagsModalState({ state: "create", value: false });
    // dispatch(toggleCreateNoteModal(false));
    // dispatch(setEditNote(null));
  };

  const tagsHandler = (tag: string, type: string) => {
    const newTag = tag.toLocaleLowerCase();

    if (type === "add") {
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
      ...editNote!,
      title: noteTitle,
      content: value,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime(),
    };

    // 수정중이라는 뜻
    if (editNote) {
      note = { ...editNote, ...note };
    } else {
      note = {
        ...note,
        date,
        createdTime: new Date().getTime(),
        editedTime: null,
        isPinned: false,
        isRead: false,
        id: v4(),
      };
    }
    // setCreateNoteState(note);
    setCreateNoteState(note);
    // setCreateNoteState((currentNotes) => {
    //   return { ...currentNotes, mainNotes: [...currentNotes.mainNotes, note] };
    // });
    setTagsModalState({ state: "create", value: false });
    // dispatch(setEditNote(null));
  };

  return (
    <>
      <FixedContainer>
        {viewAddTagsModal && (
          <TagsModal
            type='add'
            addedTags={addedTags}
            handleTags={tagsHandler}
          />
        )}
        <Box>
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
          <div>
            <TextEditor color={noteColor} value={value} setValue={setValue} />
          </div>
          <AddedTagsBox>
            {addedTags.map(({ tag, id }) => (
              <div key={id}>
                <span className='createNote__tag'>{tag}</span>
                <span
                  className='createNote__tag-remove'
                  onClick={() => tagsHandler(tag, "remove")}
                >
                  <FaTimes />
                </span>
              </div>
            ))}
          </AddedTagsBox>

          <OptionsBox>
            <ButtonOutline
              onClick={() => setTagsModalState({ state: "add", value: true })}
            >
              Add Tag
            </ButtonOutline>
            <div>
              <label>배경색 : </label>
              <select
                value={noteColor}
                id='color'
                onChange={(e) => setNoteColor(e.target.value)}
              >
                <option value=''>white</option>
                <option value='#ffcccc'>red</option>
                <option value='#ccffcc'>green</option>
                <option value='#cce0ff'>blue</option>
                <option value='#ffffcc'>yellow</option>
              </select>
            </div>

            <div>
              <label>우선순위 : </label>
              <select
                value={priority}
                id='priority'
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value='low'>Low</option>
                <option value='high'>High</option>
              </select>
            </div>
          </OptionsBox>
          <div className='createNote__create-btn'>
            <ButtonFill onClick={createNoteHandler}>
              {editNote ? <span>SAVE</span> : <span>CREATE</span>}
            </ButtonFill>
          </div>
        </Box>
      </FixedContainer>
    </>
  );
};

export default CreateNoteModal;
