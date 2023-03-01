import { useState, useEffect } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import api from "../utils/Api.js";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import PopupWithImage from "./PopupWithImage.jsx";
import PopupTypeProfile from "./PopupTypeProfile.jsx";
import PopupTypeCard from "./PopupTypeCard.jsx";
import PopupTypeAvatar from "./PopupTypeAvatar.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { register, authorize, checkTokenApi } from "../utils/Auth.jsx";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupWithFormOpen, setIsPopupWithFormOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [login, setLogin] = useState("");
  const history = useHistory();

  function handleRegister(data) {
    register(data)
      .then((res) => {
        setIsAuthSuccess(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log('smth wrong');
        setIsAuthSuccess(false);
      })
      .finally(() => {
        handleInfoTooltipOpen();
      });
  }

  function handleAuthorize(data) {
    authorize(data)
      .then((res) => {
        setLogin(data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        handleInfoTooltipOpen();
        setIsAuthSuccess(false);
      });
  }

  function checkToken() {
    checkTokenApi()
      .then((data) => {
        setLoggedIn(true);
        history.push("/");
        setLogin(data.email);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setСurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser({ name, about }) {
    api
      .updateInfo({ name, about })
      .then((userData) => {
        setСurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar({ avatar })
      .then((userData) => {
        setСurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleCardClick(cardToOpen) {
    setSelectedCard(cardToOpen);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups(e) {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupWithFormOpen(false);
    setIsInfoTooltipOpen(false);
    setIsImagePopupOpen(false);
  }

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isImagePopupOpen
    ) {
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isImagePopupOpen,
  ]);

  function handleAddPlaceSubmit(newCardData) {
    api
      .addNewCard(newCardData)
      .then((cardsData) => {
        setCards([cardsData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    !isLiked
      ? api.setLike(card._id, !isLiked).then((card) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? card : c))
          );
        })
      : api
          .deleteLike(card._id, !isLiked)
          .then((card) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? card : c))
            );
          })
          .catch((err) => {
            console.log(err);
          });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function logout() {
    setLoggedIn(false);
    setLogin("");
    setСurrentUser({});
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLogged={loggedIn} login={login} onClick={logout} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
            onEditProfile={() => setIsEditProfilePopupOpen(true)}
            onAddPlace={() => setIsAddPlacePopupOpen(true)}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          ></ProtectedRoute>

          <Route path="/signin">
            <Login handleLogin={handleAuthorize} />
          </Route>

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        {loggedIn ? <Footer /> : null}

        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          btnText="Да"
          isOpen={isPopupWithFormOpen}
          onClose={closeAllPopups}
        />
        <PopupTypeAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupTypeProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupTypeCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <PopupWithImage
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSucsess={isAuthSuccess}
          text={
            isAuthSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
