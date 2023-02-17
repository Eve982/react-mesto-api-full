import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card.jsx";
import avatarEditIcon from "../images/avatar-edit-icon.svg";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__info">
          <button
            type="button"
            aria-label="Изменить фотографию профиля."
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Фотография профиля."
              className="profile__avatar"
            />
            <div className="profile__avatar-overlay">
              <img
                src={avatarEditIcon}
                alt="Иконка редактирования фотографии профиля."
                className="profile__avatar-edit-icon"
              />
            </div>
          </button>
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__name-edit-button hover-opacity"
              aria-label="Редактировать профиль."
              onClick={onEditProfile}
            ></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-card-button hover-opacity"
          aria-label="Добавить место."
          onClick={onAddPlace}
        ></button>
      </section>
      <section>
        <ul className="cards">
          {cards.map((card) => (
            <li className="card" key={card._id}>
              <Card
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
