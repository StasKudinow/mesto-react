import '../App.css';
import { useState, useEffect } from 'react';
import api from "../utils/api";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddCardPopup from './AddCardPopup';
import EditAvatarPopup from './EditAvatarPopup';

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

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleAddCardSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
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
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
          />

          <Footer />

          <EditProfilePopup
            isOpen={ isEditProfilePopupOpen && 'popup_opened' }
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddCardPopup
            isOpen={ isAddCardPopupOpen && 'popup_opened' }
            onClose={closeAllPopups}
            onAddCard={handleAddCardSubmit}
          />

          <EditAvatarPopup
            isOpen={ isEditAvatarPopupOpen && 'popup_opened' }
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

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