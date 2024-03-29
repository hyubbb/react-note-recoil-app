import { useEffect } from "react";

interface IProps {
  elm: string;
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
}

export default function useOnClickOutside({ elm, ref, handler }: IProps) {
  useEffect(() => {
    const bgElm = document.getElementsByClassName(elm)[0] || document;
    const listener = (e: Event) => {
      // 내부클릭
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      handler();
    };
    bgElm.addEventListener("mousedown", listener);

    return () => {
      bgElm.removeEventListener("mousedown", listener);
    };
  }),
    [];
}
