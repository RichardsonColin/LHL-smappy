"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const cookieSession = require('cookie-session');
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const bcrypt = require('bcrypt');
const path = require('path');
const flash = require('connect-flash');


const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const allMapsRoutes = require("./routes/all_maps");
const favoritesRoutes = require("./routes/favorites");
const newFavoriteRoutes = require("./routes/new-favourite");
const contributionsRoutes = require("./routes/contributions");

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'compressed'
}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['Cleo'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(flash());

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/all_maps", allMapsRoutes(knex));
app.use("/api/favorites", favoritesRoutes(knex));
app.use("/api/contributions", contributionsRoutes(knex));
app.use("/api/new-favourite", newFavoriteRoutes(knex));

// Home page
app.get("/", (req, res) => {
  let loggedIn = false;
  if (req.session.user_id) {
    loggedIn = true;
  }
   let templateVars = {
                       loggedIn: loggedIn,
                       errors: req.flash('error')
                      };
  res.render("index", templateVars
  );
});


app.get("/profile", (req, res) => {
  let loggedIn = false;
  if (req.session.user_id) {
    loggedIn = true;
  }
   let templateVars = {
                       loggedIn: loggedIn,
                       userid: req.session.user_id,
                       errors: req.flash('error')
                      };
  res.render("profile", templateVars
  );
});

app.get("/new-map", (req, res) => {
  let loggedIn = false;
  if (req.session.user_id) {
    loggedIn = true;
  }
  let templateVars = {
                       loggedIn: loggedIn,
                       userid: req.session.user_id,
                       errors: req.flash('error')

                       };
  res.render("new-map", templateVars);
});

function createNewMap(data) {
  return knex('maps')
    .insert(data)
    .returning('*')
    .then((mapData) => {
      let mapId = mapData[0].id;
      console.log('IM THE MAP ID BITCH',mapId);
      return mapId;
    });
}

app.post("/new-map", (req, res) => {

  let newMapData = req.body;
  newMapData.user_id = req.session.user_id;
  console.log(newMapData);

  createNewMap(newMapData).then(result => {
    console.log('IM THE RESULT',result);
    res.send(String(result));
  });

  //res.json({success: true});
});



// TO DO MOVE THIS TO HELP FUNCTIONS

function registerUser(email, password) {
  let user_id = 0;
  return knex('users')
    .insert({
      email: email,
      password: password
    })
    .returning('*')
    .then((users) => {
      console.log(users[0].id);
      user_id = users[0].id;
      return user_id;
    });
}


function checkEmailInDB(email) {
  return knex
    .select('email')
    .from('users')
    .where({'email': email})
    .then((users) => {
      return users.length !== 0;
    });
}

function checkLogin(emailreq, password) {
  return knex('users')
  .where({ email: emailreq })
  .returning('*')
  .then((result) => {
    if (bcrypt.compareSync(password, result[0].password))  {
      return result[0].id;
    }
    else {
      return 0;
    }

  });
}



app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/maps/:id", (req, res) => {
  let loggedIn = false;
  if (req.session.user_id) {
    loggedIn = true;
  }
  let mapData = {};
  let markersData = {};

  function getMapData(id) {
    return knex
      .select()
      .from('maps')
      .where('id', id)
      .then((maps) => {
        mapData = maps[0];
        return id;
      });
  }

  function getMarkers(id) {
    return knex
      .select()
      .from('markers')
      .where('map_id', id)
      .then((markers) => {
        markersData = markers;
    });
  }


  getMapData(req.params.id).then(exists => {
    if(exists) {
      return getMarkers(req.params.id).then(() => {
        let dataTemplate = {
          map_data1: mapData,
          markers_input: markersData
        };
        console.log(dataTemplate);
        dataTemplate = JSON.stringify(dataTemplate);
        res.render('map_page', {data: dataTemplate, errors: req.flash('error'), loggedIn: loggedIn});
      });
    } else {
      res.status(404).send("Map doesn't exist");
    }
  });
});




app.post('/logout', (req, res) => {
  console.log("I AM NOT POSTING AND I DON'T KNOW WHY");
  req.session.user_id = null;
  res.redirect(req.get('referer'));
});


app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!req.body.email || !req.body.password) {
    req.flash('error', 'Both email and password are required');
    res.redirect(req.get('referer'));
    return;
    }
    // console.log(password);
    checkEmailInDB(email, password)
    .then(exists => {
      console.log('I AM THE EXISTS!', exists);
      if (exists) {
        checkLogin(email, password)
        .then(exists => {
          console.log('I AM EXISTS!',exists);
          // console.log('I am the result of the function promise',exists);
          if (exists) {
            req.session.user_id = exists;
            console.log(req.session.user_id);
            res.redirect(req.get('referer'));
          }
          else {
            console.log(exists);
            req.flash('error', 'Email and password do not match');
            res.redirect(req.get('referer'));
            return;
          }
        });
      }
      else {
        req.flash('error', 'Email is not registered');
        res.redirect(req.get('referer'));
        return;
      }
  });
});


app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  if (!req.body.email || !req.body.password) {
    req.flash('error', 'Both email and password are required');
    res.redirect(req.get('referer'));
    return;
  }
  checkEmailInDB(email, password)
  .then(exists => {
    if (!exists) {
      return registerUser(email, password)
      .then(user_id => {
        req.session.user_id = user_id;
        // console.log('right after registration ',req.session.user_id);
        res.redirect(req.get('referer'));
      });
    } else {
      req.flash('error', 'Email is not unique');
      res.redirect(req.get('referer'));
    }
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
