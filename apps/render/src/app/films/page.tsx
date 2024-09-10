import { Films } from "src/components/films";
import { getGenres } from "src/data/films";

export const metadata = {
	title: "Films | ruicsh",
};

async function FilmsPage() {
	const genres = await getGenres();

	return <Films genres={genres} />;
}

export default FilmsPage;
