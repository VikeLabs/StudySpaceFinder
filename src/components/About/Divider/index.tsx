import style from "./divider.module.css";


function Divider({children}: any) {
    return (
        <div className={style.container}>
                {children}
        </div>
    );
  }
  
  export default Divider;