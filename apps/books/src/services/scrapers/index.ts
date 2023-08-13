import AmazonScraper from "src/services/scrapers/amazon.co.uk";
import BlackwellsScraper from "src/services/scrapers/blackwells.co.uk";
import HiveScraper from "src/services/scrapers/hive.co.uk";
import PostscriptScraper from "src/services/scrapers/psbooks.co.uk";

interface IFetchBookArgs {
  url: string;
}

class BookScraper {
  $amazon = new AmazonScraper();
  $hive = new HiveScraper();
  $psbooks = new PostscriptScraper();
  $blackwells = new BlackwellsScraper();

  async fetchBookPage(
    args: IFetchBookArgs
  ): Promise<Partial<IScrapedBookDetails> | null> {
    const { url } = args;
    const parsed = new URL(url);

    if (/amazon/.test(parsed.hostname)) {
      return this.$amazon.fetchBookPage({ url });
    }
    if (/hive/.test(parsed.hostname)) {
      return this.$hive.fetchBookPage({ url });
    }
    if (/psbooks/.test(parsed.hostname)) {
      return this.$psbooks.fetchBookPage({ url });
    }
    if (/blackwells/.test(parsed.hostname)) {
      return this.$blackwells.fetchBookPage({ url });
    }

    return null;
  }

  getSlugFromUrl(url: string) {
    const parsed = new URL(url);

    if (/amazon/.test(parsed.hostname)) {
      const [, slug] = parsed.pathname.split("/");
      return slug;
    }
    if (/hive/.test(parsed.hostname)) {
      const [, , , slug] = parsed.pathname.split("/");
      return slug;
    }
    if (/psbooks/.test(parsed.hostname)) {
      const [, slug] = parsed.pathname.split("/");
      return slug;
    }
    if (/blackwells/.test(parsed.hostname)) {
      const [, , slug] = parsed.pathname.split("/");
      return slug;
    }

    return null;
  }
}

export default BookScraper;
