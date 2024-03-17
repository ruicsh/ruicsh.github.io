import { useBooksStore, useDispatch } from "src/store/books";

type IProps = {
	genre: IBookGenre;
};

export function Genre(props: IProps) {
	const { genre } = props;
	const { slug, label } = genre;
	const activeGenres = useBooksStore((state) => state.genres);
	const isActive = activeGenres.includes(slug);
	const dispatch = useDispatch();

	const onToggleGenre = (activeGenre: string) => {
		dispatch({ type: "TOGGLE_GENRE", payload: { genre: activeGenre } });
	};

	return (
		<li
			className="flex gap-2 border-b px-1 leading-loose text-neutral-600 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
			onClick={() => onToggleGenre(slug)}
		>
			<input type="checkbox" checked={isActive} />
			<span className="text-[.7rem] uppercase">{label}</span>
		</li>
	);
}
