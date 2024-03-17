import { Button } from "src/library/button";
import { useBooksStore, useDispatch } from "src/store/books";

export function Collections() {
	const activeCollection = useBooksStore((state) => state.collection);
	const dispatch = useDispatch();

	const onClickOption = (collection: IBooksCollection) => () => {
		dispatch({ type: "SET_COLLECTION", payload: { collection } });
	};

	return (
		<ul className="flex gap-3">
			{[
				{ value: "queue", label: "Queue" },
				{ value: "read", label: "Read" },
				{ value: "wishlist", label: "Wishlist" },
			].map(({ value, label }) => (
				<li key={`books-nav-${value}`} className="py-2">
					<Button
						className="font-heading px-2 py-2 text-2xl font-bold uppercase leading-6 text-neutral-400 transition-colors hover:bg-stone-200 hover:text-black aria-pressed:text-black aria-selected:text-black"
						onClick={onClickOption(value as IBooksCollection)}
						isActive={value === activeCollection}
					>
						{label}
					</Button>
				</li>
			))}
		</ul>
	);
}
