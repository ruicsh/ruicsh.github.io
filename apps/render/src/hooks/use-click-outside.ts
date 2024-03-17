import {
	useCallback,
	useEffect,
	type MutableRefObject,
	type MouseEvent,
} from "react";

type IArgs = {
	elementRef: MutableRefObject<HTMLElement | null>;
	onClickOutside: (event?: MouseEvent) => void;
};

export function useClickOutside(args: IArgs) {
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
		[elementRef, onClickOutside],
	);

	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [handleClick]);

	return { elementRef };
}
