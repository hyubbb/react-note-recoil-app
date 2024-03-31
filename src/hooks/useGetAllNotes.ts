import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  notesListSelector,
  notesListState,
} from "../recoil/atoms/notesListState";

const useGetAllNotes = (type: string) => {
  console.log("useGetAllNotes", type);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [notesData, setNotesData] = useRecoilState(notesListState);
  // const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const loadable = useRecoilValueLoadable(notesListSelector(type));

  const requestFetchTodos = useCallback((): void => {
    if (loadable === null || loadable === undefined) {
      return;
    }
    switch (loadable.state) {
      case "loading":
        setIsLoading(true);
        break;
      case "hasValue":
        // setIsDataFetched(true);
        setIsLoading(false);
        setNotesData(loadable.contents);
        break;
      case "hasError":
        setIsError(false);
        setIsLoading(false);
        break;
      default:
        return;
    }
  }, [loadable, setNotesData]);

  useEffect(() => {
    // if (!isDataFetched) {
    requestFetchTodos();
    // }
  }, [loadable, requestFetchTodos]);
  return { isLoading, isError, notesData };
};

export default useGetAllNotes;
