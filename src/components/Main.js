import api from "../utils/api";
import Card from "./Card";
import React, { useState, useEffect } from "react";

function Main(props) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfileData(), api.getInitialCards()])
      .then(([profileData, cardsData]) => {
        setUserName(profileData.name);
        setUserDescription(profileData.about);
        setUserAvatar(profileData.avatar);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, []);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={userAvatar} alt="аватар" />
            <button className="profile__avatar-button" onClick={props.onEditAvatar}>
              <div className="profile__avatar-edit"></div>
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name profile__name_text-hidden">{userName}</h1>
            <p className="profile__job profile__job_text-hidden">{userDescription}</p>
            <button className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
        </div>
        <button className="profile__add-button" onClick={props.onAddCard}></button>
      </section>

      <section className="elements">
        {cards.map((data) => {
          return <Card card={data} onCardClick={props.onCardClick} />
        })}
      </section>
    </main>
  );
}

export default Main;