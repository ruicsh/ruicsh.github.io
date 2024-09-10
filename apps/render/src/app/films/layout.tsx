import { type PropsWithChildren } from "react";

function FilmsLayout(props: PropsWithChildren) {
	const { children } = props;

	return <main className="flex gap-4">{children}</main>;
}

export default FilmsLayout;
