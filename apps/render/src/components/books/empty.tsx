import styles from "./empty.module.scss";

function EmptyList() {
  return (
    <div className={styles.root}>
      <h1>No Results Found</h1>
      <p>Seems like we don't have results for that.</p>
      <p>Try adding or removing different filters.</p>
    </div>
  );
}

export default EmptyList;
