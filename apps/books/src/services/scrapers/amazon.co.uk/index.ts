import vm from "node:vm";

import fletch from "@tuplo/fletcher";
import $ from "cheerio";

interface IPageMediaData {
  audibleData: undefined;
  data: {
    imageGalleryData: {
      mainUrl: string;
    }[];
  };
}

interface IFetchBookArgs {
  url: string;
}

class AmazonScraper {
  async fetchBookPage(args: IFetchBookArgs) {
    const { url } = args;
    const $page = await fletch.html(url);
    const details = this.$getBookDetails($page);
    const cover = this.$getCover($page);

    return { ...details, cover };
  }

  $getCover($page: cheerio.Cheerio) {
    const script = $page.find("script:contains('imageGalleryData')").html();

    const lines = script?.split("\n") ?? [];
    const startIndex = lines.findIndex((line) => /var data/i.test(line));
    const endIndex = lines.findIndex((line) => /return data/i.test(line));

    const src = lines.slice(startIndex, endIndex).join("\n");
    const code = new vm.Script(src);
    const sandbox = { audibleData: undefined };
    vm.createContext(sandbox);
    code.runInContext(sandbox);
    const { data } = sandbox as IPageMediaData;
    const [imageGalleryData] = data.imageGalleryData || [];

    return imageGalleryData?.mainUrl;
  }

  $getBookDetails($page: cheerio.Cheerio) {
    return $page
      .find("#rich_product_information [role='listitem']")
      .toArray()
      .reduce((acc, item) => {
        const $item = $(item);
        const label = $item.find(".rpi-attribute-label span").text().trim();
        const value = $item.find(".rpi-attribute-value span").text().trim();

        if (/Publisher/i.test(label)) {
          acc.publisher = value;
        }

        if (/Print length/i.test(label)) {
          const [, pageCount] = /(\d+)/.exec(value) ?? [];
          acc.pageCount = Number(pageCount);
        }

        if (/Publication date/i.test(label)) {
          const publishedDate = new Date(value);
          acc.publishedDate = publishedDate.toISOString().slice(0, 10);
        }

        if (/ISBN-10/i.test(label)) {
          acc.isbn10 = value;
        }

        if (/ISBN-13/i.test(label)) {
          acc.isbn13 = value.replace(/[^\d]/g, "");
        }

        return acc;
      }, {} as IScrapedBookDetails);
  }
}

export default AmazonScraper;
