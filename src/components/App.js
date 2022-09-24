import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

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
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(false);
  };


  return (
    <div className="page">
      <Header />

      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddCard={handleAddCardClick} onCardClick={handleCardClick} />

      <Footer />

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={ isEditProfilePopupOpen && 'popup_opened' } onClose={closeAllPopups}>
        <div className="popup__field">
          <input className="popup__input popup__input_profile_name" id="profile-name" type="text" name="name" value="Жак-Ив Кусто" minLength="2" maxLength="40" required />
          <span className="profile-name-error popup__error"></span>
        </div>
        <div className="popup__field">
          <input className="popup__input popup__input_profile_job" id="profile-job" type="text" name="job" value="Исследователь океана" minLength="2" maxLength="200" required />
          <span className="profile-job-error popup__error"></span>
        </div>
        <button className="popup__button" type="submit">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="cards" title="Новое место" isOpen={ isAddCardPopupOpen && 'popup_opened' } onClose={closeAllPopups}>
        <div className="popup__field">
          <input className="popup__input popup__input_cards_name" id="cards-name" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
          <span className="cards-name-error popup__error"></span>
        </div>
        <div className="popup__field">
          <input className="popup__input popup__input_cards_link" id="cards-link" type="url" placeholder="Ссылка на картинку" name="link" required />
          <span className="cards-link-error popup__error"></span>
        </div>
        <button className="popup__button" type="submit">Создать</button>
      </PopupWithForm>

      <PopupWithForm name="delete" title="Вы уверены?">
        <button className="popup__button popup__button_delete" type="submit">Да</button>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={ isEditAvatarPopupOpen && 'popup_opened' } onClose={closeAllPopups}>
        <div className="popup__field">
          <input className="popup__input popup__input_avatar_link" id="avatar-link" type="url" placeholder="Ссылка на новый аватар" name="link" required />
          <span className="avatar-link-error popup__error"></span>
        </div>
        <button className="popup__button" type="submit">Сохранить</button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} isOpen={selectedCard && 'popup_opened'} onClose={closeAllPopups} />
    </div>
  );
}

export default App;