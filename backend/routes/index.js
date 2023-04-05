const router = require('express').Router();
const swaggerUi = require('swagger-ui-express'); // added
const swaggerDocument = require('../openapi.json'); // added
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not_found_error');
const { createUser, login, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validatiors');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // added

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.post('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс ${req.baseUrl} не найден.`));
});
module.exports = router;
