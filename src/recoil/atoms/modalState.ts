import { atom, selector } from "recoil";

interface ModalState {
  viewEditTagsModal: boolean;
  viewAddTagsModal: boolean;
  viewCreateNoteModal: boolean;
  viewFiltersModal: boolean;
}

interface ToggleTagsType {
  state: string;
  value: boolean;
}
const initialState: ModalState = {
  viewEditTagsModal: false,
  viewAddTagsModal: false,
  viewCreateNoteModal: false,
  viewFiltersModal: false,
};

const tagInitialState: ToggleTagsType = {
  state: "",
  value: false,
};

export const modalState = atom({
  key: "modalState",
  default: initialState,
});

export const tagModalState = atom({
  key: "tagModalState",
  default: tagInitialState,
});

export const toggleTagsModalState = selector({
  key: "toggleTagsModalState",
  get: ({ get }) => {
    return get(modalState);
  },
});

export const toggleTagsModalSelector = selector({
  key: "toggleTagsModalSelector",
  get: ({ get }) => {
    return get(tagModalState);
  },
  set: ({ set, get }, newValue) => {
    const currentModalState = get(modalState);
    const { state, value } = newValue as ToggleTagsType;

    if (state === "add") {
      set(modalState, { ...currentModalState, viewAddTagsModal: value });
    }
    if (state === "edit") {
      set(modalState, { ...currentModalState, viewEditTagsModal: value });
    }

    if (state === "create") {
      set(modalState, { ...currentModalState, viewCreateNoteModal: value });
    }

    if (state === "filter") {
      set(modalState, { ...currentModalState, viewFiltersModal: value });
    }
  },
});
