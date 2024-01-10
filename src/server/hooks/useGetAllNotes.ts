import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  NotesList,
  notesListSelector,
  notesListState,
} from "../../recoil/atoms/notesListState";

const useGetAllNotes = (type: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [notesData, setNotesData] = useRecoilState(notesListState);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const loadable = useRecoilValueLoadable<Omit<NotesList, "editNote">>(
    notesListSelector(type)
  );

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
        setNotesData((prev) => {
          return {
            ...prev,
            ...(loadable.contents as NotesList),
          };
        });

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
    if (
      !isDataFetched &&
      notesData.mainNotes.length === 0 &&
      notesData.archiveNotes.length === 0 &&
      notesData.trashNotes.length === 0
    ) {
      requestFetchTodos();
    }
  }, [loadable, requestFetchTodos, isDataFetched]);
  return { isLoading, isError, notesData };
};

export default useGetAllNotes;
