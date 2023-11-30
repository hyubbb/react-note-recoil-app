import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  viewEditTagsModal: boolean;
  viewAddTagsModal: boolean;
  viewCreateNoteModal: boolean;
  viewFiltersModal: boolean;
}

const initialState: ModalState = {
  viewEditTagsModal: false,
  viewAddTagsModal: false,
  viewCreateNoteModal: false,
  viewFiltersModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleTagsModal: (state, { payload }) => {
      const { type, view } = payload;
      console.log(type);
      if (type === "add") {
        state.viewAddTagsModal = view;
      } else {
        state.viewEditTagsModal = view;
      }
    },
    toggleCreateNoteModal: (state, action) => {
      state.viewCreateNoteModal = action.payload;
    },
    toggleFiltersModal: (state, action) => {
      state.viewFiltersModal = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { toggleTagsModal, toggleCreateNoteModal, toggleFiltersModal } =
  modalSlice.actions;
