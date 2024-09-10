import { Icon, IconType } from "src/library/icon";

import type { IGenre } from "../types.d";

type IProps = {
	genre: IGenre;
	onToggleGenre: (activeGenre: string) => void;
};

export function Genre(props: IProps) {
	const { genre, onToggleGenre } = props;
	const { slug, label } = genre;

	const toggleActiveGenre = () => {
		onToggleGenre(slug);
	};

	return (
		<button
			className="inline-flex items-center gap-1 rounded-md border border-stone-200 px-1 hover:bg-stone-100"
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
