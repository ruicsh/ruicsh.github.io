import { useCallback, useEffect, type MutableRefObject } from "react";

interface IUseClickOutsideArgs {
  elementRef: MutableRefObject<HTMLElement | null>;
  onClickOutside: () => void;
}

export function useClickOutside(args: IUseClickOutsideArgs) {
  const { elementRef, onClickOutside } = args;

  const handleClick: EventListener = useCallback(
    (event) => {
      if (
        !elementRef?.current ||
        elementRef.current?.contains(event.target as Node)
      ) {
        return;
      }

      onClickOutside();
    },
    [elementRef, onClickOutside]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return { elementRef };
}
