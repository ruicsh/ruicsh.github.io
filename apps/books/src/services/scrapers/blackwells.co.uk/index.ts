import fletch from "@tuplo/fletcher";
import * as df from "date-fns";

interface IFetchBookArgs {
  url: string;
}

class BlackwellsScraper {
  async fetchBookPage(args: IFetchBookArgs) {
    const { url } = args;
    const $page = await fletch.html(url);
    const details = this.$getBookDetails($page);
    const cover = this.$getCover(details.isbn13 || details.isbn10 || "");

    return { ...details, cover };
  }

  $getBookDetails($page: cheerio.Cheerio) {
    const $productInfo = $page.find(".product-detail");

    const isbn = this.$getIsbn($productInfo);
    const pageCount = this.$getPageCount($productInfo);
    const publisher = this.$getPublisher($productInfo);
    const publishedDate = this.$getPublishedDate($productInfo);

    return { ...isbn, pageCount, publisher, publishedDate };
  }

  $getPageCount($productInfo: cheerio.Cheerio) {
    const txt = $productInfo.find("[itemprop=numberOfPages]").text().trim();
    if (!txt) return undefined;

    return Number(txt);
  }

  $getPublisher($productInfo: cheerio.Cheerio) {
    const txt = $productInfo.find("[itemprop=publisher]").text().trim();
    if (!txt) return undefined;

    return txt;
  }

  $getPublishedDate($productInfo: cheerio.Cheerio) {
    const txt = $productInfo.find("[itemProp=datePublished]").text();
    const date = df.parse(txt, "dd MMM yyyy", new Date());

    return date.toISOString().slice(0, 10);
  }

  $getIsbn($productInfo: cheerio.Cheerio) {
    let isbn10;
    let isbn13;
    const txt = $productInfo.find("[itemprop=isbn]").text().trim();
    if (txt.length === 13) {
      isbn13 = txt;
    }
    if (txt.length === 10) {
      isbn10 = txt;
    }

    return { isbn10, isbn13 };
  }

  $getCover(isbn: string) {
    const url = new URL("https://blackwells.co.uk");
    url.pathname = `/jacket/500x500/${isbn}.webp`;

    return url.href;
  }
}

export default BlackwellsScraper;
