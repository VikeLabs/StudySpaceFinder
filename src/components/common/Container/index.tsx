import style from "./Container.module.css";


function Container({children}: any) {
    return (
        <div className={style.container}>
            {children}
        </div>
    );
  }
  
  export default Container;