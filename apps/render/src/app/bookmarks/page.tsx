import { Bookmarks } from "src/components/bookmarks";
import { getBookmarks } from "src/data/bookmarks";

export const metadata = {
	title: "Bookmarks | ruicsh",
};

async function BookmarksPage() {
	const bookmarks = await getBookmarks();

	return <Bookmarks bookmarks={bookmarks} />;
}

export default BookmarksPage;
