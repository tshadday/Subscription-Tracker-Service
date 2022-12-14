const path = require("path");
const express = require("express");
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require("./config/connection");
const exphbs = require('express-handlebars');


// allows us to save sessions into database
// created table called sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// requirement for sessions; setup for saving to database
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};
app.use(session(sess));

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on PORT # https://localhost:3001'));
});