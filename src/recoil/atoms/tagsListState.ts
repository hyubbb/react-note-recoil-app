import { toast } from "react-toastify";
import { DefaultValue, atom, selector } from "recoil";
import { Tag } from "../../types/tag";
import { getTags } from "../../server/api";
import { Note } from "../../types/note";

export interface TagsListType {
  type: string | null;
  tagsList: Tag[];
}

const initialState: TagsListType = {
  type: null,
  tagsList: [],
};

export const tagsListState = atom({
  key: "tagsListState",
  default: initialState,
});

export const tagsListSelectorFamily = selector({
  key: "tagsListSelectorFamily",
  get: async () => {
    const response = await getTags.get();
    return response;
  },
});

export const tagsListSelector = selector({
  key: "tagsListSelector",
  get: ({ get }) => {
    return get(tagsListState);
  },
  set: ({ set, get, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(tagsListState);
      return;
    }
    const currentTagsList = get(tagsListState);

    const { tagsList: oldTagsList } = currentTagsList;
    const { type, tagsList } = newValue;

    if (type === "add") {
      const existingTag = oldTagsList.find(
        ({ tag }) => tag === tagsList[0].tag
      );
      if (existingTag) {
        toast.warning("이미 존재하는 태그입니다.");
      } else {
        // 새로운 태그를 현재 배열에 추가
        set(tagsListState, {
          ...currentTagsList,
          tagsList: oldTagsList.concat(tagsList[0]),
        });

        getTags.update(tagsList[0]);
        toast.info("새로운 태그가 등록되었습니다.");
      }
    } else if (type === "delete") {
      const { id: deleteId, tag } = tagsList[0];
      const newTagsList = oldTagsList.filter(({ id }) => {
        return id !== deleteId;
      });

      set(tagsListState, { ...currentTagsList, tagsList: newTagsList });
      getTags.delete(tagsList[0]);

      toast.info("태그가 삭제되었습니다.");
    }
  },
});

const notesDataRemove = (notesData, deleteTag) => {
  const noteNum = [
    notesData.mainNotes,
    notesData.archiveNotes,
    notesData.trashNotes,
  ];

  const removedTag = noteNum.map((note, i) => {
    const a = note.reduce((acc, cur) => {
      const { tags } = cur;

      const newTags =
        tags.length > 0 ? tags.filter(({ tag }) => tag !== deleteTag) : tags;

      acc.push({ ...cur, tags: newTags });
      return acc;
    }, []);

    return a;
  });

  const b = {
    ...notesData,
    mainNotes: removedTag[0] as Note[],
    archiveNotes: removedTag[1] as Note[],
    trashNotes: removedTag[2] as Note[],
  };

  const newNotesData = { notes: b };

  return newNotesData;
};
