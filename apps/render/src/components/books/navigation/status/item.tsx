import { useBooksStore } from "src/store/books";
import { Icon, IconType } from "src/library/icon";

type IProps = {
	genre: IBookGenre;
};

export function Genre(props: IProps) {
	const { genre } = props;
	const { label } = genre;

	const dispatch = useBooksStore((state) => state.dispatch);

	const toggleActiveGenre = () => {
		dispatch({ type: "TOGGLE_GENRE", payload: { genre: label } });
	};

	return (
		<button
			className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-stone-100 px-1 hover:bg-stone-200"
			onClick={toggleActiveGenre}
			type="button"
		>
			<span className="whitespace-nowrap text-[0.6rem] font-bold uppercase text-stone-800">
				{label}
			</span>
			<Icon icon={IconType.XMark} className="h-[10px] w-[10px] bg-stone-800" />
		</button>
	);
}
