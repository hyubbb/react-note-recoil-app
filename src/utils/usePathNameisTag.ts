import { useLocation } from "react-router-dom";

const usePathNameisTag = () => {
  const isTag = useLocation().pathname.includes("tag");
  return isTag;
};

export default usePathNameisTag;
