type IBookmarksOnInbox = {
  savedOnDate: string;
  url: string;
};

type IBookmark = {
  id?: string;
  slug: string;
  url: string;
  title: string;
  excerpt?: string;
  savedOnDate: string;
  createdAt?: string;
};

type IPageMetadata = {
  title: string;
  description?: string;
};
