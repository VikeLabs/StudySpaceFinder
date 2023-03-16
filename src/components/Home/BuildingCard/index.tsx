import { Link } from "react-router-dom";
import { Building } from "types";
import style from "./BuildingCard.module.css";

interface PropType {
  building: Building; // building name
}

function BuildingCard({ building }: PropType) {
  return (
    <Link
      className={style.buildingCard}
      to={`classrooms?building=${building.id}`}
    >
      {building.name}
    </Link>
  );
}

export default BuildingCard;
