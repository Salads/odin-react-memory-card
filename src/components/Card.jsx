import "../styles/Card.css";

function Card(props) {
	return (
		<div className="card" onClick={props.handleClick}>
			<img className="card-image" src={props.data.imgSrc}></img>
			<p className="card-title">{props.data.title}</p>
		</div>
	);
}

export default Card;