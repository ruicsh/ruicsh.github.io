interface IGetRouteArgs {
  collection: IBooksCollection;
  page: number;
}

function getRoute(args: IGetRouteArgs) {
  const { collection, page } = args;
  const parts = [collection && `books/${collection}`, page && `page/${page}`];

  return `/${parts.filter(Boolean).join("/")}`;
}

export default getRoute;
