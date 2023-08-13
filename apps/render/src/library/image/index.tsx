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

  useEffect(() => {
    if (!rootRef.current) return;

    const { width, height } = rootRef.current.getBoundingClientRect();
    setSize({ width, height });
  }, []);

  return (
    <NextImage
      className={cls}
      ref={rootRef}
      src={src}
      width={size.width}
      height={size.height}
      alt={alt}
    />
  );
}

export default Image;