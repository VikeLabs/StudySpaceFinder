import { Link } from "react-router-dom";
import style from "./BuildingCard.module.css";

interface PropType {
  building: string; // building name
}

function BuildingCard({ building }: PropType) {
  return (
    <Link className={style.buildingCard} to={`classrooms?building=${building}`}>
      {building}
    </Link>
  );
}

export default BuildingCard;
