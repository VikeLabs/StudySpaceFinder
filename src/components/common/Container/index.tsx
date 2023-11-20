import { ReactNode } from "react";
import style from "./Container.module.css";

interface Props {
  children: ReactNode;
  bottomPadding?: boolean;
}

function Container({ children, bottomPadding = true }: Props) {
  return (
    <div className={style.outerContainer}>
      <div className={bottomPadding ? style.innerContainer : style.innerContainerNBP}>{children}</div>
    </div>
  );
}

export default Container;
