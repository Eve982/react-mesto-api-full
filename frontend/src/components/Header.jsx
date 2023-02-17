import { Route, NavLink, Switch } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";

function Header({ isLogged, login, onClick }) {
  const linkClass = "header__navigation-item";
  const linkClassActive = "header__navigation-item_active";
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип сайта - слово 'Mesto' латинскими буквами."
      />
      <nav className="header__navigation-list">
        {isLogged ? (
          <>
            <NavLink
              to="/"
              className={linkClass}
              activeClassName={linkClassActive}
            >
              {login}
            </NavLink>
            <NavLink
              to="/signin"
              className={linkClass}
              activeClassName={linkClassActive}
              onClick={onClick}
            >
              Выйти
            </NavLink>
          </>
        ) : (
          <Switch>
            <Route path="/signin">
              <NavLink
                to="/signup"
                className={linkClass}
                activeClassName={linkClassActive}
              >
                Регистрация
              </NavLink>
            </Route>
            <Route path="/signup">
              <NavLink
                to="/signin"
                className={linkClass}
                activeClassName={linkClassActive}
              >
                Войти
              </NavLink>
            </Route>
          </Switch>
        )}
      </nav>
    </header>
  );
}
export default Header;
