import style from "./BuildingCard.module.css"

function BuildingCard(props: any) {
    return (
        <p className={style.buildingCard}>{String(props.building)}</p>
    );
  }
  
  export default BuildingCard;
