"use client";

import { useEffect } from "react";

import { List } from "src/library/list";
import { MediaNavigation } from "src/library/media-navigation";
import type { IGenre } from "src/library/media-navigation/types.d";
import { useDispatch, useFilmsStore } from "src/store/films";
import { selectFilms } from "src/store/films/selectors";

import { Film } from "./card";

const collections = [
	{ value: "watched", label: "Watched" },
	{ value: "wishlist", label: "Wishlist" },
];

type IProps = {
	genres: IGenre[];
};

export function Films(props: IProps) {
	const { genres } = props;
	const dispatch = useDispatch();
	const { films } = useFilmsStore(selectFilms);

	const activeCollection = useFilmsStore((state) => state.collection);

	useEffect(() => {
		fetch("/static/data/films.json")
			.then((response) => response.json())
			.then((films) => dispatch({ type: "SET_FILMS", payload: { films } }));
	}, [dispatch]);

	useEffect(() => {
		useFilmsStore.persist.rehydrate();

		const onPopState = () => useFilmsStore.persist.rehydrate();
		window.addEventListener("popstate", onPopState);

		return () => {
			window.removeEventListener("popstate", onPopState);
		};
	}, []);

	const activeGenres = useFilmsStore((state) => state.genres);

	const onChangeCollection = (collection: string) => {
		dispatch({ type: "SET_COLLECTION", payload: { collection } });
	};

	const onToggleGenre = (activeGenre: string) => {
		console.log("ruic:onToggleGenre", activeGenre);
		dispatch({ type: "TOGGLE_GENRE", payload: { genre: activeGenre } });
	};

	return (
		<div className="flex w-full flex-col gap-8">
			<MediaNavigation
				activeCollection={activeCollection}
				activeGenres={activeGenres}
				collections={collections}
				genres={genres}
				onChangeCollection={onChangeCollection}
				onToggleGenre={onToggleGenre}
			/>
			<List<IFilm>
				itemRenderer={(film, i) => <Film film={film} order={i} />}
				items={films}
				keyFactory={(book) => book.title}
			/>
		</div>
	);
}
