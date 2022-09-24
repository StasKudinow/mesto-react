function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  };

  return (
    <div className="elements__card" key={props.card._id}>
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button className="elements__trash"></button>
      <div className="elements__title">
        <h2 className="elements__name elements__name_text-hidden">{props.card.name}</h2>
        <div className="elements__likes">
          <button className="elements__button"></button>
          <p className="elements__counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;