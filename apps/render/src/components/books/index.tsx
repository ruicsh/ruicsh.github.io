"use client";

import { useEffect } from "react";

import { List } from "src/library/list";
import { MediaNavigation } from "src/library/media-navigation";
import type { IGenre } from "src/library/media-navigation/types.d";
import { useBooksStore, useDispatch } from "src/store/books";
import { selectBooks } from "src/store/books/selectors";

import { Book } from "./card";

const collections = [
	{ value: "read", label: "Read" },
	{ value: "wishlist", label: "Wishlist" },
	{ value: "queue", label: "Queue" },
];

type IProps = {
	genres: IGenre[];
};

export function Books(props: IProps) {
	const { genres } = props;
	const dispatch = useDispatch();
	const { books } = useBooksStore(selectBooks);

	const activeCollection = useBooksStore((state) => state.collection);

	useEffect(() => {
		fetch("/static/data/books.json")
			.then((response) => response.json())
			.then((books) => dispatch({ type: "SET_BOOKS", payload: { books } }));
	}, [dispatch]);

	useEffect(() => {
		useBooksStore.persist.rehydrate();

		const onPopState = () => useBooksStore.persist.rehydrate();
		globalThis.addEventListener("popstate", onPopState);

		return () => {
			globalThis.removeEventListener("popstate", onPopState);
		};
	}, []);

	const activeGenres = useBooksStore((state) => state.genres);

	const onChangeCollection = (collection: string) => {
		dispatch({ type: "SET_COLLECTION", payload: { collection } });
	};

	const onToggleGenre = (activeGenre: string) => {
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
			<List<IBook>
				itemRenderer={(book, i) => <Book book={book} order={i} />}
				items={books}
				keyFactory={(book) => book.title}
			/>
		</div>
	);
}
