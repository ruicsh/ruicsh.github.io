import clsx from "clsx";

import { Icon, IconType } from "src/library/icon";

import styles from "./index.module.scss";

type IProps = {
	className?: string;
	label: string;
	onClick: () => void;
};

export function Pillow(props: IProps) {
	const { className, label, onClick } = props;
	const cls = clsx(styles.root, className);

	return (
		<button className={cls} onClick={onClick} type="button">
			<span>{label}</span>
			<Icon icon={IconType.XMark} />
		</button>
	);
}
