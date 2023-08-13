import fletch from "@tuplo/fletcher";
import * as df from "date-fns";

interface IFetchBookArgs {
  url: string;
}

class HiveScraper {
  async fetchBookPage(args: IFetchBookArgs) {
    const { url } = args;
    const $page = await fletch.html(url);
    const details = this.$getBookDetails($page);
    const cover = this.$getCover($page);

    return { ...details, cover };
  }

  $getBookDetails($page: cheerio.Cheerio) {
    const $productInfo = $page.find(".productInfoWrapGrid .productInfo");

    const pageCount = this.$getPageCount($productInfo);
    const publisher = this.$getPublisher($productInfo);
    const publishedDate = this.$getPublishedDate($productInfo);
    const isbn = this.$getIsbn($productInfo);

    return { pageCount: Number(pageCount), publisher, publishedDate, ...isbn };
  }

  $getPageCount($productInfo: cheerio.Cheerio) {
    const txt = $productInfo.find("[itemProp=numberOfPages]").text();
    const [, pageCount] = /(\d+) pages/.exec(txt) || [];

    return Number(pageCount);
  }

  $getPublisher($productInfo: cheerio.Cheerio) {
    return $productInfo.find("[itemProp=publisher]").text().trim();
  }

  $getPublishedDate($productInfo: cheerio.Cheerio) {
    const txt = $productInfo.find("[itemProp=datePublished]").text();
    const date = df.parse(txt, "dd/MM/yyyy", new Date());

    return date.toISOString().slice(0, 10);
  }

  $getIsbn($productInfo: cheerio.Cheerio) {
    let isbn10;
    let isbn13;
    const txt = $productInfo.find("[itemProp=isbn]").text().trim();
    if (txt.length === 13) {
      isbn13 = txt;
    }
    if (txt.length === 10) {
      isbn10 = txt;
    }

    return { isbn10, isbn13 };
  }

  $getCover($page: cheerio.Cheerio) {
    const imageUrl = $page.find("[name=twitter:image]").attr("content");
    if (!imageUrl) return undefined;

    const url = new URL(imageUrl);
    const parts = url.pathname.split("/");
    parts[2] = "640";
    url.pathname = parts.join("/");

    return url.href;
  }
}

export default HiveScraper;
