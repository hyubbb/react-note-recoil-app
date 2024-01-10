import useGetTags from "./useGetTags";
import useGetAllNotes from "./useGetAllNotes";

const useLoadInitData = () => {
  useGetAllNotes("allNotes");
  useGetTags();
};

export default useLoadInitData;
