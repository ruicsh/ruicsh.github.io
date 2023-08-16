"use client";

import NextImage from "next/image";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";

interface ISize {
  width: number;
  height: number;
}

interface IProps {
  className?: string;
  src: string;
  alt: string;
}

function Image(props: IProps) {
  const { alt, className, src } = props;
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
      className={cls}
      ref={rootRef}
      src={srcUrl.href}
      width={size.width}
      height={size.height}
      alt={alt}
      loading="lazy"
    />
  );
}

export default Image;
