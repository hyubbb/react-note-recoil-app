import { useEffect } from "react";

interface IProps {
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
}

export default function useOnClickOutside({ ref, handler }: IProps): void {
  const bgElm = document.querySelector(".menu__background") || document;
  useEffect(() => {
    const listener = (e: Event) => {
      // 내부클릭
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      // 외부클릭
      handler();
    };
    bgElm.addEventListener("mousedown", listener);

    return () => {
      bgElm.removeEventListener("mousedown", listener);
    };
  }),
    [];
}

// export default useOnClickOutside;
