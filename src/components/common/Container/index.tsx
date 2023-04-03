import { ReactNode } from "react";
import style from "./Container.module.css";

interface Props {
  children: ReactNode;
}

function Container({ children }: Props) {
  return (
    <div className={style.outerContainer}>
      <div className={style.innerContainer}>{children}</div>
    </div>
  );
}

export default Container;
