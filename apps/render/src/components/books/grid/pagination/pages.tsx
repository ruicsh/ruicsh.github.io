import { IconType } from "src/library/icon";
import getRoute from "src/routes";

import NavButton from "./nav-button";

import styles from "./pages.module.scss";

interface IProps {
  collection: IBooksCollection;
  numberOfPages: number;

  page: number;
}

function Pages(props: IProps) {
  const { collection, numberOfPages, page } = props;

  const isFirstDisabled = page === 1;
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === numberOfPages;
  const isLastDisabled = page === numberOfPages;

  return (
    <section className={styles.root}>
      <NavButton
        dataRole="first"
        isDisabled={isFirstDisabled}
        icon={IconType.Step}
        link={getRoute({ collection, page: 1 })}
      />
      <NavButton
        dataRole="prev"
        isDisabled={isPrevDisabled}
        icon={IconType.Arrow}
        link={getRoute({ collection, page: page - 1 })}
      />
      <span className={styles.label}>
        Page <strong>{page}</strong> of <strong>{numberOfPages}</strong>
      </span>
      <NavButton
        dataRole="next"
        isDisabled={isNextDisabled}
        icon={IconType.Arrow}
        link={getRoute({ collection, page: page + 1 })}
      />
      <NavButton
        dataRole="last"
        isDisabled={isLastDisabled}
        icon={IconType.Step}
        link={getRoute({ collection, page: numberOfPages })}
      />
    </section>
  );
}

export default Pages;
