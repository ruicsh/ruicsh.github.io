import { type MouseEvent, type PropsWithChildren } from "react";

import { cn } from "src/lib/cn";

export type IProps = {
	className?: string;
	disabled?: boolean;
	isActive?: boolean;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function Button(props: PropsWithChildren<IProps>) {
	const { children, className, isActive, onClick, ...restOfProps } = props;

	const cls = cn("flex-inline items-center rounded appearance-none", className);

	return (
		<button
			type="button"
			className={cls}
			aria-pressed={isActive}
			onClick={onClick}
			{...restOfProps}
		>
			{children}
		</button>
	);
}
