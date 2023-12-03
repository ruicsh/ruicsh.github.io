type IProps = {
  page: number;
  totalItems: number;
};

export function Items(props: IProps) {
  const { page, totalItems } = props;
  const start = (page - 1) * 18 + 1;
  const end = start + 18 > totalItems ? totalItems : start + 18 - 1;

  return (
    <span>
      <strong>{start}</strong> to <strong>{end}</strong> of{" "}
      <strong>{totalItems}</strong>
    </span>
  );
}
