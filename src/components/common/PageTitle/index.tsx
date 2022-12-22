import style from "./PageTitle.module.css";

interface props {
  name: String
}

export const PageTitle = (props: props) => {
  return (
    <div>
        <h1 className={style.title}>{props.name}</h1>
    </div>
  );
};
