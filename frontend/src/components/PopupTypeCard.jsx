import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupTypeCard({ isOpen, onClose, onAddCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  function handleSetName(e) {
    setName(e.target.value);
  }
  function handleSetLink(e) {
    setLink(e.target.value);
  }
  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: name,
      link: link,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="card-name-input"
        required
        type="text"
        name="name"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        className="popup__input popup__input_edit_card-name"
        onChange={handleSetName}
        value={name || ""}
        autoComplete="on"
      />
      <span
        id="card-name-input-error"
        className="popup__input-error-span-margin popup__input-error-span-message"
      ></span>
      <input
        id="card-url-input"
        required
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_edit_card-link"
        onChange={handleSetLink}
        value={link || ""}
        autoComplete="on"
      />
      <span
        id="card-url-input-error"
        className="popup__input-error-span-margin popup__input-error-span-message"
      ></span>
    </PopupWithForm>
  );
}
export default PopupTypeCard;
