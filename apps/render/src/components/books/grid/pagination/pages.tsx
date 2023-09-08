import { IconType } from "src/library/icon";

import NavButton from "./nav-button";

import styles from "./pages.module.scss";

interface IProps {
  numberOfPages: number;
  page: number;
}

function Pages(props: IProps) {
  const { numberOfPages, page } = props;

  const isFirstDisabled = page === 1;
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === numberOfPages;
  const isLastDisabled = page === numberOfPages;

  return (
    <section className={styles.root}>
      <NavButton
        dataRole="first"
        icon={IconType.Step}
        isDisabled={isFirstDisabled}
        toPage={1}
      />
      <NavButton
        dataRole="prev"
        icon={IconType.Arrow}
        isDisabled={isPrevDisabled}
        toPage={page - 1}
      />
      <span className={styles.label}>
        Page <strong>{page}</strong> of <strong>{numberOfPages}</strong>
      </span>
      <NavButton
        dataRole="next"
        icon={IconType.Arrow}
        isDisabled={isNextDisabled}
        toPage={page + 1}
      />
      <NavButton
        dataRole="last"
        icon={IconType.Step}
        isDisabled={isLastDisabled}
        toPage={numberOfPages}
      />
    </section>
  );
}

export default Pages;
