import clsx from "clsx";

import Pillow from "src/library/pillow";
import { useBooksStore } from "src/store/books";

interface IProps {
  className?: string;
  genre: IBookGenre;
}

function StatusGenre(props: IProps) {
  const { className, genre } = props;
  const cls = clsx(className);

  const toggleActiveGenre = useBooksStore((state) => state.toggleActiveGenre);

  return (
    <Pillow
      className={cls}
      label={genre.label}
      onClick={() => toggleActiveGenre(genre.slug)}
    />
  );
}

export default StatusGenre;
