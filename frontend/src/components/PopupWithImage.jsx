function PopupWithImage({ isOpen, onClose, card }) {
  return (
    <div
      className={`popup popup_type_photo ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <figure
        className="popup__photo-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close-button hover-opacity"
          aria-label="Закрыть окно просмотра изображения."
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__photo-image" />
        <figcaption className="popup__photo-name">{card.name}</figcaption>
      </figure>
    </div>
  );
}
export default PopupWithImage;
