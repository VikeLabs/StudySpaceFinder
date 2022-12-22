import { Link } from "react-router-dom";
import style from "./BuildingCard.module.css"

function BuildingCard(props: any) {
    return (
        <Link className={style.buildingCard} to={`classrooms?building=${props.building}`}>{props.building}</Link>
    );
  }
  
  export default BuildingCard;
