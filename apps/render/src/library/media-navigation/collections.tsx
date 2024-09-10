"use client";

import { Button } from "src/library/button";

import type { ICollection } from "./types.d";

type IProps = {
	activeCollection?: string;
	collections: ICollection[];
	onChangeCollection: (collection: string) => void;
};

export function Collections(props: IProps) {
	const { activeCollection, collections = [], onChangeCollection } = props;

	const onClickOption = (collection: string) => () => {
		onChangeCollection(collection);
	};

	return (
		<ul className="flex justify-center gap-3">
			{collections.map(({ value, label }) => (
				<li key={`books-nav-${value}`} className="py-2">
					<Button
						className="font-heading px-2 py-2 text-2xl font-bold uppercase leading-6 text-stone-400 transition-colors hover:bg-stone-200 hover:text-black aria-pressed:text-black aria-selected:text-black"
						onClick={onClickOption(value)}
						isActive={value === activeCollection}
					>
						{label}
					</Button>
				</li>
			))}
		</ul>
	);
}
