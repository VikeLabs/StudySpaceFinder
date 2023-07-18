import style from "./PageTitle.module.css";

interface Props {
  name: string;
}

export const PageTitle = ({ name }: Props) => {
  return <h1 className={style.title}>{name}</h1>;
};
