import { AnchorHTMLAttributes } from "react";
import cx from "classnames";
import style from "./Anchor.module.css";

export function Anchor(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { children, className } = props;
  return (
    <a {...props} target="_blank" className={cx(style.a, className)}>
      {children}
    </a>
  );
}
