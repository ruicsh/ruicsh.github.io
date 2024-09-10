import { Collections } from "./collections";
import { Genres } from "./genres";
import { Status } from "./status";
import type { ICollection, IGenre } from "./types.d";

type IProps = {
	activeGenres: string[];
	activeCollection?: string;
	collections: ICollection[];
	onChangeCollection: (collection: string) => void;
	onToggleGenre: (activeGenre: string) => void;
	genres: IGenre[];
};

export function MediaNavigation(props: IProps) {
	const {
		activeCollection,
		activeGenres,
		collections,
		genres,
		onChangeCollection,
		onToggleGenre,
	} = props;

	return (
		<nav className="w-full border-b-2 border-stone-400">
			<Collections
				activeCollection={activeCollection}
				collections={collections}
				onChangeCollection={onChangeCollection}
			/>
			<div className="flex border-t border-stone-400 py-2">
				<Genres
					activeGenres={activeGenres}
					genres={genres}
					onToggleGenre={onToggleGenre}
				/>
				<Status
					activeGenres={activeGenres}
					genres={genres}
					onToggleGenre={onToggleGenre}
				/>
			</div>
		</nav>
	);
}
