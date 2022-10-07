import Card from "./Card";
import React, { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardsContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
            <button className="profile__avatar-button" onClick={props.onEditAvatar}>
              <div className="profile__avatar-edit" />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name profile__name_text-hidden">{currentUser.name}</h1>
            <p className="profile__job profile__job_text-hidden">{currentUser.about}</p>
            <button className="profile__edit-button" onClick={props.onEditProfile} />
          </div>
        </div>
        <button className="profile__add-button" onClick={props.onAddCard} />
      </section>

      <section className="elements">
        {cards.map((data) => {
          return <Card
            key={data._id}
            card={data}
            onCardClick={props.onCardClick}
            id={currentUser._id}
          />
        })}
      </section>
    </main>
  );
}

export default Main;