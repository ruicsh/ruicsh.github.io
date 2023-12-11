import { Books } from "src/components/books";
import { getGenres } from "src/data/books";

export const metadata = {
	title: "Books | ruicsh",
};

async function BooksPage() {
	const genres = await getGenres();

	return <Books genres={genres} />;
}

export default BooksPage;
