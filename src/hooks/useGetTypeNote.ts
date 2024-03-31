import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { notesListState } from "../recoil/atoms/notesListState";
import { getAllNoteList } from "../server/api";
import { AxiosError } from "axios";

const useGetTypeNote = (type: string) => {
  const setNote = useSetRecoilState(notesListState);

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await getAllNoteList.getNotes(type);
        setNote(response);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError.message);
      }
    };

    getNote();
  }, [type, setNote]); // type과 setNote를 의존성 배열에 포함
};

export default useGetTypeNote;
