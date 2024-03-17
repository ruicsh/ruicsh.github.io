"use client";

import { useEffect } from "react";

import { useBooksStore, useDispatch } from "src/store/books";

import { Grid } from "./grid";
import { Navigation } from "./navigation";

type IProps = {
	genres: IBookGenre[];
};

export function Books(props: IProps) {
	const { genres } = props;
	const dispatch = useDispatch();

	useEffect(() => {
		fetch("/static/data/books.json")
			.then((response) => response.json())
			.then((books) => dispatch({ type: "SET_BOOKS", payload: { books } }));
	}, [dispatch]);

	useEffect(() => {
		useBooksStore.persist.rehydrate();

		const onPopState = () => useBooksStore.persist.rehydrate();
		window.addEventListener("popstate", onPopState);

		return () => {
			window.removeEventListener("popstate", onPopState);
		};
	}, []);

	return (
		<div className="flex w-full flex-col gap-8">
			<Navigation genres={genres} />
			<Grid />
		</div>
	);
}
