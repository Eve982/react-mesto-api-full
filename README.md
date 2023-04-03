# Проект Mesto фронтенд + бэкенд
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения, написанные на React и Node.js соответственно.

- IP 158.160.38.225
- Frontend http://eve982.pet-project.nomoredomains.work
- Backend http://api.eve982.pet-project.nomoredomains.work

Приложение предоставляет возможность создавать свой профиль и размещать в нем фотографии. Сайт разработан по методологии mobile-first и адаптирован под просмотр на разрешениях экрана от 320px до 1440px.

## Технологии:
![JavaScript](https://img.shields.io/badge/-JavaScript-090909?style=for-the-badge&logo=JavaScript)
![React](https://img.shields.io/badge/-React-090909?style=for-the-badge&logo=REACT)
![BEM](https://img.shields.io/badge/-BEM_nested-090909?style=for-the-badge&logo=BEM)
![CSS3](https://img.shields.io/badge/-CSS3-090909?style=for-the-badge&logo=CSS3)
![HTML5](https://img.shields.io/badge/-HTML5-090909?style=for-the-badge&logo=HTML5)

![Node.js](https://img.shields.io/badge/-Node.js-090909?style=for-the-badge&logo=Node.js)
![Express](https://img.shields.io/badge/-Express-090909?style=for-the-badge&logo=Express)
![MongoDB](https://img.shields.io/badge/-MongoDB-090909?style=for-the-badge&logo=MongoDB)
![dotenv](https://img.shields.io/badge/-dotenv-090909?style=for-the-badge&logo=dotenv)
![nodemon](https://img.shields.io/badge/-nodemon-090909?style=for-the-badge&logo=nodemon)
![eslint](https://img.shields.io/badge/-eslint-090909?style=for-the-badge&logo=eslint)
![Postman](https://img.shields.io/badge/-Postman-090909?style=for-the-badge&logo=Postman)

## Функционал API:

- Регистрация;
- Авторизация;
- Изменение данных пользователя;
- Изменение аватара;
- Получение списка пользователя;
- Получение пользователя по ID;
- Получение информации о текущем пользователе;
- Получение списка карточек;
- Создание/удаление карточки;
- Постановка/снятие лайка.

## Директории

- `/controllers` — обработчики данных
- `/errors` - возможные ошибки приложения
- `/middlewares` - промежуточные обработчики авторизации, CORS-запросов, валидации и логов
- `/models` — схемы БД
- `/routes` — маршруты
- `/utils` — вспомогательные утилиты и константы

## Копирование проекта на локальную машину:
Все команды необходимо выполнять в командной строке Вашего ПК. Первую команду следует выполнять в той локальной папке своего ПК, в которую Вы хотите склонировать проект из стороннего репозитория.
Клонировать репозиторий выполнением следующей команды в командной строке:

```
git clone <сссылка на проект>
```
если Вы используете SSH-подключение, то, вместо <сссылка на проект>, укажите:

```
git@github.com:Eve982/react-mesto-api-full.git
```
для HTTPS-подключений укажите следующую ссылку:

```
https://github.com/Eve982/react-mesto-api-full.git
```

Перейти в клонированый проект командой:

```
cd react-mesto-api-full
```

## Локальный запуск проекта
Для запуска данного проекта локально Вам поднадобиться открыть 2 окна терминала. 

В первом окне терминала находясь в папке react-mesto-api-full/backend выполнить команду для запуска сервера:
```
npm run start
```
или команду для запуска сервера в режиме разработчика если Вы планируете вносить изменения в приложение:
```
npm run dev
```
Сервер на Node.js по-умолчанию запускается на 3000-м порту.

Во втором окне терминала находясь в папке react-mesto-api-full/frontend выполнить команду для запуска React-приложения:
```
npm start
```
React-приложение также по-умолчанию запускается на 3000 порту, поэтому после выполнения последней команды Вам надо будет ответить на следующий вопрос:
```
Would you like to run the app on another port instead? › (Y/n)
```
введите 'y'.

Проект должен быть доступен по адресу:
```
http://localhost:3001/signin
```

Номер порта может быть иной в зависимости от того, какой ближайший порт будет свободен на Вашей машине.

Если Ваш проект запущен на ином порте, нежели 3001 или 3002, Вам необходимо добавить строку адреса с Вашим портом в список разрешенных адресов ALLOWED_CORS в [файл /react-mesto-api-full/backend/utils/constants.js](./react-mesto-api-full/backend/utils/constants.js) в таком формате:
```
'http://localhost:<номер_порта>',
```

Для остановки сервера и React-приложения в каждом терминале необходимо выполнить команду Ctrl+C.
  
## Ссылка на макет в Figma
https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1

### **Автор**
[Ольга Боброва](https://github.com/eve982)

<!-- ## Заметка для рыбки Дори!

Если возникнут проблемы с деплоем, то необходимо проверить как работает модуль frontend/src/utils/constants.js который ты добавила. Данный модуль используется в следующих файлах:
- [/react-mesto-api-full/backend/utils/Api.js](/react-mesto-api-full/backend/utils/Api.js);
- [/react-mesto-api-full/backend/utils/Auth.jsx](/react-mesto-api-full/backend/utils/Auth.jsx). -->