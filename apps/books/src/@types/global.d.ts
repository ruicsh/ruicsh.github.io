interface IScrapedBookDetails {
  cover: string;
  isbn10: string;
  isbn13: string;
  pageCount: number;
  publishedDate: string;
  publisher: string;
}

interface IBookDetails {
  id?: string;
  authors: string;
  cover: string;
  description: string;
  isbn10: string;
  isbn13: string;
  pageCount: number;
  publishedDate: string;
  publisher: string;
  subtitle?: string;
  title: string;
  rating?: number;
  sourceUrl: string;
}

interface IBookOnInbox {
  wishedOnDate?: string;
  queuedOnDate?: string;
  readOnDate?: string;
  rating?: number;
  sourceUrl: string;
}

type IBookToSave = IBookOnInbox & IBookDetails;

type IBookCollection = "read" | "queue" | "wishlist";
