import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupTypeAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null);
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-url-input"
        required
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_edit_avatar-link"
        ref={avatarRef}
        autoComplete="on"
      />
      <span
        id="avatar-url-input-error"
        className="popup__input-error-span-margin popup__input-error-span-message"
      ></span>
    </PopupWithForm>
  );
}
export default PopupTypeAvatar;
