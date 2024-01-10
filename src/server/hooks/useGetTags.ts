import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  TagsListType,
  tagsListSelectorFamily,
  tagsListState,
} from "../../recoil/atoms/tagsListState";

const useGetTags = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [tagsData, setTagsData] = useRecoilState(tagsListState);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const loadable = useRecoilValueLoadable<TagsListType>(tagsListSelectorFamily);

  const requestFetchTodos = useCallback((): void => {
    if (loadable === null || loadable === undefined) {
      return;
    }

    switch (loadable.state) {
      case "loading":
        setIsLoading(true);
        break;
      case "hasValue":
        setIsDataFetched(true);

        setTagsData({ ...tagsData, tagsList: loadable.contents });

        break;
      case "hasError":
        setIsError(false);
        setIsLoading(false);
        break;
      default:
        return;
    }
  }, [loadable, setTagsData]);

  useEffect(() => {
    if (!isDataFetched) {
      requestFetchTodos();
    }
  }, [loadable, requestFetchTodos, isDataFetched]);
  return { tagsData };
};

export default useGetTags;
