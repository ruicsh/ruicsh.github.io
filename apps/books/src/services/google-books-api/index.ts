import fetch from "@tuplo/fetch";

import config from "src/config";

interface IFindVolumeArgs {
  isbn: string;
}

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

    const data = await fetch<IGoogleBookApiVolumesResponse>(url.href);
    const json = await data.json();
    const [volume] = json.items;

    return volume?.volumeInfo;
  }
}

export default GoogleBooksApi;
