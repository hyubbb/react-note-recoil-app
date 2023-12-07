import { toast } from "react-toastify";
import { DefaultValue, atom, selector } from "recoil";
import { v4 } from "uuid";
import { Tag } from "../../types/tag";

interface TagsListType {
  type: string | null;
  tagsList: Tag[];
}

const initTag = [
  { tag: "coding", id: v4() },
  { tag: "exercise", id: v4() },
  { tag: "quotes", id: v4() },
];

const initialState: TagsListType = {
  type: null,
  tagsList: [...initTag],
};

export const tagsListState = atom({
  key: "tagsListState",
  default: initialState,
});

export const tagsListSelector = selector<TagsListType>({
  key: "tagsListSelector",
  get: ({ get }) => {
    return get(tagsListState);
  },
  set: ({ set, get, reset }, newValue) => {
    // newValue가 DefaultValue인 경우 리셋 로직을 처리
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

        toast.info("새로운 태그가 등록되었습니다.");
      }
    } else if (type === "delete") {
      const { id: deleteId } = tagsList[0];
      const newTagsList = oldTagsList.filter(({ id }) => {
        return id !== deleteId;
      });

      set(tagsListState, { ...currentTagsList, tagsList: newTagsList });
      toast.info("태그가 삭제되었습니다.");
    }
  },
});
