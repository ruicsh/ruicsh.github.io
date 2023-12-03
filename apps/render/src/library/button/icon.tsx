import { type PropsWithChildren } from "react";
import clsx from "clsx";

import { Icon, IconType } from "src/library/icon";

import { Button, type IProps as IButtonProps } from "./index";

type IProps = IButtonProps & {
  icon: IconType;
};

export function IconButton(props: PropsWithChildren<IProps>) {
  const { children, className, icon, ...restOfProps } = props;
  const cls = clsx(className);

  return (
    <Button className={cls} {...restOfProps}>
      <Icon icon={icon} />
      {children && <span>{children}</span>}
    </Button>
  );
}
