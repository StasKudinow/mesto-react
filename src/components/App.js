import '../App.css';
import { useState, useEffect } from 'react';
import api from "../utils/api";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard({});
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, []);


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Header />

          <Main 
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick}
            onCardClick={handleCardClick}
            onSetCards={(cards) => {
              setCards(cards);
            }}
          />

          <Footer />

          <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            button={'Сохранить'}
            isOpen={ isEditProfilePopupOpen && 'popup_opened' }
            onClose={closeAllPopups}>
            <div className="popup__field">
              <input className="popup__input popup__input_profile_name" id="profile-name" type="text" name="name" value="Жак-Ив Кусто" minLength="2" maxLength="40" required />
              <span className="profile-name-error popup__error" />
            </div>
            <div className="popup__field">
              <input className="popup__input popup__input_profile_job" id="profile-job" type="text" name="job" value="Исследователь океана" minLength="2" maxLength="200" required />
              <span className="profile-job-error popup__error" />
            </div>
          </PopupWithForm>

          <PopupWithForm
            name="cards"
            title="Новое место"
            button={'Создать'}
            isOpen={ isAddCardPopupOpen && 'popup_opened' }
            onClose={closeAllPopups}>
            <div className="popup__field">
              <input className="popup__input popup__input_cards_name" id="cards-name" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
              <span className="cards-name-error popup__error" />
            </div>
            <div className="popup__field">
              <input className="popup__input popup__input_cards_link" id="cards-link" type="url" placeholder="Ссылка на картинку" name="link" required />
              <span className="cards-link-error popup__error" />
            </div>
          </PopupWithForm>

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            button={'Да'}
          />

          <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            button={'Сохранить'}
            isOpen={ isEditAvatarPopupOpen && 'popup_opened' }
            onClose={closeAllPopups}>
            <div className="popup__field">
              <input className="popup__input popup__input_avatar_link" id="avatar-link" type="url" placeholder="Ссылка на новый аватар" name="link" required />
              <span className="avatar-link-error popup__error" />
            </div>
          </PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;