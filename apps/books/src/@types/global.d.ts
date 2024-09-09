type IScrapedBookDetails = {
	cover: string;
	isbn10: string;
	isbn13: string;
	pageCount: number;
	publishedDate: string;
	publisher: string;
};

type IBookDetails = {
	authors: string;
	cover: string;
	coverColor: string;
	description: string;
	id?: string;
	isbn10: string;
	isbn13: string;
	pageCount: number;
	publishedDate: string;
	publisher: string;
	rating?: number;
	slug?: string;
	sourceUrl: string;
	subtitle?: string;
	title: string;
};

type IBookInInbox = {
	genres: string;
	wishedOnDate?: string;
	queuedOnDate?: string;
	readOnDate?: string;
	rating?: number;
	sourceUrl: string;
};

type IBookToSave = IBookInInbox & IBookDetails;

type IBookCollection = "read" | "queue" | "wishlist";
