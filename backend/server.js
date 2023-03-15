const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Define secret key
const secretKey = 'mysecretkey';

// Enable CORS with default options
app.use(cors());

// Add the auth middleware
app.db = router.db;
app.use(auth);
app.use(middlewares);

// Add the /api/auth/me endpoint to check if user is authenticated
app.get('/api/auth/me', (req, res) => {
  let token = null;
  if(req && req?.headers?.authorization){
    token = req.headers.authorization.substring(7);
  }
  

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = router.db
      .get('users')
      .find({ email: decoded.sub })
      .value();

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.json({ isAuthenticated: true });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Set up login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db
    .get('users')
    .find({ email })
    .value();

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ sub: user.email }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

// Set up user registration endpoint
app.post('/api/auth/register', (req, res, next) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  req.body.email = email;
  req.body.password = hash;
  next();
}, router);

// Set up unauthenticated route
app.use('/posts', router);

// Set up authenticated routes
const authRouter = jsonServer.router('db.json', { _isAuth: true });
app.use('/private', authRouter);

app.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});