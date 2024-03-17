import { useBooksStore } from "src/store/books";
import { selectBooks } from "src/store/books/selectors";

import { EmptyList } from "./empty";
import { Book } from "./card";

export function Grid() {
	const { books } = useBooksStore(selectBooks);

	if (books.length === 0) {
		return <EmptyList />;
	}

	return (
		<ul className="mb-8 grid grid-cols-3 gap-8">
			{books.map((book, i) => (
				<li key={book.title}>
					<Book book={book} order={i} />
				</li>
			))}
		</ul>
	);
}
