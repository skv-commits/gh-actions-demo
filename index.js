const express = require('express');
const session = require('client-sessions')

const app = express();

const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/about.html'));
});

router.get('/sitemap', function (req, res) {
    res.sendFile(path.join(__dirname + '/sitemap.html'));
});

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'my-super-secret',
    cookieName: 'session',
    duration: 60 * 60 * 1000 // 1 hour
}))

const { login, logout, checkAuth } = require('./handlers')
const headerAuth = require('./header-auth-mdw');

app.post('/session', login);
app.delete('/session', logout);
app.get('/session', headerAuth, checkAuth);

app.use('/', router);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});