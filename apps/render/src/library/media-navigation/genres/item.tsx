import type { IGenre } from "../types.d";

type IProps = {
	activeGenres: string[];
	genre: IGenre;
	onToggleGenre: (activeGenre: string) => void;
};

export function Genre(props: IProps) {
	const { activeGenres = [], genre, onToggleGenre } = props;
	const { slug, label } = genre;

	const isActive = activeGenres.includes(slug);

	return (
		<li
			className="flex gap-2 border-b px-1 leading-loose text-stone-600 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-stone-200 hover:text-stone-900"
			onClick={() => onToggleGenre(slug)}
		>
			<input type="checkbox" checked={isActive} />
			<span className="text-[.7rem] uppercase">{label}</span>
		</li>
	);
}
