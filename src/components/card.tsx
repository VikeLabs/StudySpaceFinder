import '../App.css';

function Card(props: any) {
  return (
    <div key={props.key} className='card'>
      <h2>{props.user.name}</h2>
      <p>{props.user.phone}</p>
      <p>{props.user.website}</p>
    </div>
  )
}

export default Card;
