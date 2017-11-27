# README

## Smappy - Lighthouse Labs Midterm Project
- Colin Richardson
- Mark Zsombor
- Kelsey Cooper
- Reid Naaykens

## To run Smappy

1. Download repsoitory into a repostiory on your machine
 https://github.com/RyukyuColin/map_app-midterm
2. Cd from your terminal into that new repsoitory
3. Run `npm install`
4. Run `npm run local` - wait for `Smappy app listening on port 8080`
5. In your browser go to http://localhost:8080/



## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Bcrypt 1.0.3 `npm install bcrypt`
- Body Parser 1.15.2 `npm install body-parser`
- Connect Flash 0.1.1 `npm install connect-flash`
- Cookie Session 2.0.0-beta.3 `npm install cookie-session`
- Dotenv 4.0.0 `install dotenv --save`
- Ejs 2.4.1 `npm install ejs`
- Express 4.13.4 `npm install express --save`
- Express-flash `npm install git://github.com/RGBboy/express-flash.git`
- Knex 0.14.1 `npm install knex --save`
- Knex-logger 0.1.0 `npm install knex-logger`
- Morgan 1.7.0 `npm install morgan`
- Node Sass Middleware 0.11.0 `npm install node-sass-middleware`
- Pg 7.4.0 `npm install pg`

## Needed fixes / Known issues

- Using an apostrophe in map title, marker title, or marker description will be edited out before saving the data as it breaks the JSON used to relay this information to the client side javascript files. Need to refactor the code so that the information is called from the database from the client side instead of the server side.

- log out dropdown display doesn't show user name if users has just registered - will show user name once user has added name to profile page

## ScreenShots

!["Screenshot Create Map dropdown"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/Create-map-dropdown.png?raw=true)

!["Screenshot Profile page"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/Profile-page.png?raw=true)

!["Screenshot Index page"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/Smappy_index_page.png?raw=true)

!["Screenshot Create map page"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/create-map-page.png?raw=true)

!["Screenshot Index page left navigation slideout"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/left-navigation-out.png?raw=true)

!["Screenshot Logged in dropdown"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/logged-in-dropdown.png?raw=true)

!["Screenshot register/login dropdown"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/login:register-slideout.png?raw=true)

!["Screenshot Individual map page"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/map-page.png?raw=true)

