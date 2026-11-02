
function Card(props) {
	return (
		<div key={props.data.key} data-key={props.data.key} className="card">
			<img className="card-image" src={props.data.imgSrc}></img>
			<p className="card-title">{props.data.title}</p>
		</div>
	);
}

export default Card;