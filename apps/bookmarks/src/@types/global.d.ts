interface IBookmarksOnInbox {
  savedOnDate: string;
  url: string;
}

interface IBookmark {
  id?: string;
  slug: string;
  url: string;
  title: string;
  excerpt?: string;
  savedOnDate: string;
  createdAt?: string;
}

interface IPageMetadata {
  title: string;
  description?: string;
}
