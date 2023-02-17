import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function PopupTypeProfile({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  function handleSetName(e) {
    setName(e.target.value);
  }
  function handleSetDescription(e) {
    setDescription(e.target.value);
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name-input"
        required
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_edit_name"
        value={name || ""}
        onChange={handleSetName}
        autoComplete="on"
      />
      <span
        id="profile-name-input-error"
        className="popup__input-error-span-margin popup__input-error-span-message"
      ></span>
      <input
        id="profile-about-input"
        required
        type="text"
        name="about"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_edit_about"
        value={description || ""}
        onChange={handleSetDescription || ""}
        autoComplete="on"
      />
      <span
        id="profile-about-input-error"
        className="popup__input-error-span-margin popup__input-error-span-message"
      ></span>
    </PopupWithForm>
  );
}
export default PopupTypeProfile;
