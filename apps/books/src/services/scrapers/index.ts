import AbebooksScraper from "./abebooks.co.uk";
import AmazonScraper from "./amazon.co.uk";
import BlackwellsScraper from "./blackwells.co.uk";
import HiveScraper from "./hive.co.uk";
import PostscriptScraper from "./psbooks.co.uk";

type IFetchBookArgs = {
	url: string;
};

class BookScraper {
	$abebooks = new AbebooksScraper();
	$amazon = new AmazonScraper();
	$hive = new HiveScraper();
	$psbooks = new PostscriptScraper();
	$blackwells = new BlackwellsScraper();

	async fetchBookPage(
		args: IFetchBookArgs,
	): Promise<Partial<IScrapedBookDetails> | undefined> {
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
		if (/abebooks/.test(parsed.hostname)) {
			return this.$abebooks.fetchBookPage({ url });
		}
	}

	getSlugFromUrl(url: string) {
		const parsed = new URL(url);

		if (/amazon/.test(parsed.hostname)) {
			return parsed.pathname.split("/")[1];
		}
		if (/hive/.test(parsed.hostname)) {
			return parsed.pathname.split("/")[3];
		}
		if (/psbooks/.test(parsed.hostname)) {
			return parsed.pathname.split("/")[1];
		}
		if (/blackwells/.test(parsed.hostname)) {
			return parsed.pathname.split("/")[2];
		}
		if (/abebooks/.test(parsed.hostname)) {
			return parsed.pathname.split("/")[2];
		}
	}
}

export default BookScraper;
