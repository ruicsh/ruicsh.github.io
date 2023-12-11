"use client";

import clsx from "clsx";
import NextImage from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type ISize = {
	width: number;
	height: number;
};

type IProps = {
	className?: string;
	src: string;
	alt: string;
	style?: CSSProperties;
	blurDataUrl?: string;
};

export function Image(props: IProps) {
	const { alt, className, src, style, blurDataUrl } = props;
	const rootRef = useRef<HTMLImageElement>(null);
	const [size, setSize] = useState<ISize>({ width: 0, height: 0 });
	const cls = clsx(className);

	// eslint-disable-next-line turbo/no-undeclared-env-vars
	const pullZone = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE || "unknown";
	const srcUrl = new URL(`https://${pullZone}.b-cdn.net`);
	srcUrl.pathname = src;

	useEffect(() => {
		if (!rootRef.current) return;

		const { width, height } = rootRef.current.getBoundingClientRect();
		setSize({ width, height });
	}, []);

	return (
		<NextImage
			alt={alt}
			style={style}
			blurDataURL={blurDataUrl}
			className={cls}
			height={size.height}
			loading="lazy"
			placeholder={blurDataUrl ? "blur" : "empty"}
			ref={rootRef}
			src={srcUrl.href}
			width={size.width}
		/>
	);
}
