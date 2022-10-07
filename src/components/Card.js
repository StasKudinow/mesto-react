function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  };

  const isOwn = props.card.owner._id === props.id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'elements__trash' : 'elements__trash_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === props.id);
  const cardLikeButtonClassName = (
    `elements__button ${isLiked ? 'elements__button_active' : ''}`
  );

  return (
    <div className="elements__card" key={props.card._id}>
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} />
      <div className="elements__title">
        <h2 className="elements__name elements__name_text-hidden">{props.card.name}</h2>
        <div className="elements__likes">
          <button className={cardLikeButtonClassName} />
          <p className="elements__counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;