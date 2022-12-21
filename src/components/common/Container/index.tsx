import style from "./Container.module.css";


function Container({children}: any) {
    return (
        <div className={style.outerContainer}>
            <div className={style.innerContainer}>
                {children}
            </div>
        </div>
    );
  }
  
  export default Container;