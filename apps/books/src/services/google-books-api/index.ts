import config from "src/config";

type IFindVolumeArgs = {
	isbn: string;
};

class GoogleBooksApi {
	$baseUrl = "https://www.googleapis.com";

	async findVolumeInfo(args: IFindVolumeArgs) {
		const { isbn } = args;

		const url = new URL(this.$baseUrl);
		url.pathname = "/books/v1/volumes";
		const sp = new URLSearchParams({
			q: `isbn:${isbn}`,
			key: config.get("googleBooks.api.key"),
		});
		url.search = sp.toString();

		const response = await fetch(url.href);
		const json = (await response.json()) as IGoogleBookApiVolumesResponse;
		if (json.totalItems === 0) {
			return;
		}

		const [volume] = json.items;

		return volume?.volumeInfo;
	}
}

export default GoogleBooksApi;
