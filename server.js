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
const currentMapMarkers = require("./routes/current-map-markers");
const getMap = require("./routes/getMap");


app.set("view engine", "ejs");
app.use(morgan('dev'));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'compressed'
}));

// Sets the secure cookie session
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
app.use("/api/current-map-markers", currentMapMarkers(knex));
app.use("/api/getMap", getMap(knex));


// Inserts into map contributions
function mapContributions(contributeMapData) {
  return knex('contributions')
    .insert({
      map_id: contributeMapData.id,
      user_id: contributeMapData.user_id
    })
    .then(() => {
    return;
  });
}

// Creates new map
function createNewMap(data) {
  return knex('maps')
  .insert(data)
  .returning('*')
  .then((mapData) => {
    let mapContribute = mapData[0];
    let mapId = mapData[0].id;
    mapContributions(mapContribute);
    return mapId;
  });
}

// Check if email is already in db before login/register
function checkEmailInDB(email) {
  return knex
  .select('email')
  .from('users')
  .where({'email': email})
  .then((users) => {
    return users.length !== 0;
  });
}

// Verifies email and password match
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

// Register new urser
function registerUser(email, password) {
  let user_id = 0;
  return knex('users')
  .insert({
    email: email,
    password: password
  })
  .returning('*')
  .then((users) => {
    user_id = users[0].id;
    return user_id;
  });
}

// Create new map marker
function createNewMarker(data) {
  return knex('markers')
  .insert(data)
  .returning('*')
  .then((markerData) => {
    let mapId = markerData[0].map_id;
    let userId = markerData[0].user_id;
    let contributionsData = {
      'id': mapId,
      'user_id': userId
    };
    mapContributions(contributionsData);
    return mapId;
  });
}

// Update marker information
function updateMarker(data) {
  return knex('markers')
  .where('id', data.id)
  .update({
    map_id: data.map_id,
    title: data.title,
    description: data.description,
    picture: data.picture
  })
  .returning('*')
  .then((markerData) => {
    let mapId = markerData[0].map_id;
    return mapId;
  });
}

// Delete marker from db
function deleteMarker(id) {
  return knex('markers')
  .where('id', id)
  .del()
  .then(() => {
    return;
  });
}

// Remove favourite from favourite list
function deleteFavourite(mapId, UserId) {
  return knex('favourite_maps')
  .where({'map_id': mapId, 'user_id': UserId })
  .del()
  .then(() => {
    return;
  });
}


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


// Profile page
app.get("/profile", (req, res) => {
  let loggedIn = false;
  if (req.session.user_id) {
    loggedIn = true;
    let templateVars = {
                       loggedIn: loggedIn,
                       userid: req.session.user_id,
                       errors: req.flash('error')
                       };
  res.render("profile", templateVars
  );
  } else {
    res.redirect("/");
  }
});

// Create map page
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



///////////////HTTP REQUESTS



// Post new map
app.post("/new-map", (req, res) => {
  let newMapData = req.body;
  newMapData.user_id = req.session.user_id;

  createNewMap(newMapData).then(result => {
    res.send(String(result));
  });
});


// Get map by map id
app.get("/maps/:id", (req, res) => {
  let loggedIn = false;
  if (req.session.user_id) {
    loggedIn = true;
  }
  let mapData = {};
  let markersData = {};

  if(req.params.id) {
    res.render('map_page', {
      id: req.params.id,
      errors: req.flash('error'),
      loggedIn: loggedIn
    });
  } else {
    res.status(404).send("Map doesn't exist");
  }
});



// Log user out
app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect(req.get('referer'));
});

// Log user in
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!req.body.email || !req.body.password) {
    req.flash('error', 'Both email and password are required');
    res.redirect(req.get('referer'));
    return;
  }
  checkEmailInDB(email, password)
  .then(exists => {
    if (exists) {
      checkLogin(email, password)
      .then(exists => {
        if (exists) {
          req.session.user_id = exists;
          res.redirect(req.get('referer'));
        }
        else {
          req.flash('error', 'Email and password do not match');
          res.redirect(req.get('referer'));
          return;
        }
      });
    } else {
      req.flash('error', 'Email is not registered');
      res.redirect(req.get('referer'));
      return;
    }
  });
});

// Register user
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
        res.redirect(req.get('referer'));
      });
    } else {
      req.flash('error', 'Email is not unique');
      res.redirect(req.get('referer'));
    }
  });
});

// Create new marker
app.post("/new-marker", (req, res) => {
  let newMapData = req.body;
  newMapData.user_id = req.session.user_id;
  createNewMarker(newMapData).then(result => {
    res.send(String(result));
  });
});


// Update marker
app.post("/update-marker", (req, res) => {
  let updateMarkerData = req.body;
  updateMarkerData.user_id = req.session.user_id;
  updateMarker(updateMarkerData).then(result => {
    res.send(String(result));
  });
});

// Remove marker
app.post("/delete-marker", (req, res) => {
  let markerId = req.body.id;
  deleteMarker(markerId).then(result => {
    res.send('success');
  });
});

// Remove Favourite
app.post("/remove-favourite", (req, res) => {
  console.log('I AM THE REMOVE FAVOURITE ID',req.body);
  let mapId = req.body.id;
  let UserId = req.session.user_id;
  deleteFavourite(mapId, UserId).then(result => {
    console.log('deleted');
    res.send('success');
  });
});

//Update profile info
app.post('/profile-update', (req, res) => {
   return knex('users')
   .where({id: req.session.user_id})
  .update({name: req.body.name,
           your_location: req.body.location,
           your_description: req.body.description})
  .returning('*')
  .then((mapData) => {
  res.send(String(mapData));
  });
});




app.listen(PORT, () => {
  console.log("Smappy app listening on port " + PORT);
});
