import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  return (
    <>
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />
      <button
        type="button"
        className={`card__delete-button hover-opacity ${
          isOwn ? "" : "card__delete-button_hidden"
        }`}
        aria-label="Удалить место."
        onClick={() => onCardDelete(card)}
      ></button>
      <div className="card__info-container">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={`card__like-icon ${
              isLiked ? "card__like-icon_active" : ""
            }`}
            aria-label="Поставить лайк."
            onClick={() => onCardLike(card)}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}
export default Card;
