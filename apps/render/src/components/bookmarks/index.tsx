import { BookmarksGrid } from "./grid";

interface IProps {
  bookmarks: IBookmark[];
}

export async function Bookmarks(props: IProps) {
  const { bookmarks = [] } = props;

  return <BookmarksGrid bookmarks={bookmarks} />;
}
