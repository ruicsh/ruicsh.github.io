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
		<ul className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
			{books.map((book, i) => (
				<li key={book.title}>
					<Book book={book} order={i} />
				</li>
			))}
		</ul>
	);
}
