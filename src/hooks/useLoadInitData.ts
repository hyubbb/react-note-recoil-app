import useGetTags from "./useGetTags";
import useGetAllNotes from "./useGetAllNotes";

// 처음 로딩되었을때 메인데이터 값 불러오기.
const useLoadInitData = () => {
  useGetAllNotes("allNotes");
  // useGetTags();
};

export default useLoadInitData;
