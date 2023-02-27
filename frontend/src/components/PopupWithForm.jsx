function PopupWithForm({
  isOpen,
  onClose,
  children,
  title,
  name,
  btnText,
  onSubmit,
}) {

  return (
    <div
      onMouseDown={onClose}
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container" onMouseDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup__close-button hover-opacity"
          aria-label="Закрыть окно без сохранения."
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          action=""
          name={name}
          onSubmit={onSubmit}
          className="popup__edit-form"
        >
          {children}
          <button
            type="submit"
            className="popup__submit-button"
            aria-label="Закрыть окно с сохранением."
          >
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
