import { cmsdb } from "@ruicsh/services";

export async function getBookmarks() {
	const bookmarks = await cmsdb("bookmark")
		.select("slug", "title", "url", "excerpt", "savedOnDate")
		.orderBy("createdAt", "desc");

	return bookmarks.map((bk) => {
		const { url } = bk;

		const uri = new URL(url);

		return { ...bk, host: uri.host };
	});
}
