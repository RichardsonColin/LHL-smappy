# Smappy - Lighthouse Labs Midterm Project 2017/11/27

This map app allows users to collaboratively create maps which list multiple "points", for example: "Best Sunset Spots" or "Locations of Movie Scenes". It was built over five days during week four of the Lighthouse Labs Web Development Bootcamp. The requirements were:

* Users can see a list of the available maps
* Users can view a map
* A map can contain many points
* Each point can have: a title, description, and image
* Authenticated users can create maps
* Authenticated users can modify maps (add, edit, remove points)
* Users can favourite a map
* Users have profiles, indicating their favourite maps and maps they've contributed to

## Creators

- Colin Richardson
- Mark Zsombor
- Kelsey Cooper
- Reid Naaykens

## To Run Smappy

1. Fork and clone this repository to your local machine.
2. Cd from your terminal into that new repsoitory.
3. Create a `.env` file by using `.env.example` as a reference: `cp .env.example .env`.
4. Create a Postgres database `createdb db_name`
5. Update the `.env` file with database name.
6. Install dependencies using the `npm install` command.
7. Run migrations: `knex migrate:latest`.
8. Run `npm run local` - wait for `Smappy app listening on port 8080`.
9. In your browser go to <http://localhost:8080/>.

## App Screenshots

Create map dropdown
!["Screenshot Create Map dropdown"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/Create-map-dropdown.png?raw=true)

Profile page
!["Screenshot Profile page"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/Profile-page.png?raw=true)

Smappy index page
!["Screenshot Index page"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/Smappy_index_page.png?raw=true)

Create map page
!["Screenshot Create map page"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/create-map-page.png?raw=true)

Left navigation slideout
!["Screenshot Index page left navigation slideout"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/left-navigation-out.png?raw=true)

Logged in dropdown
!["Screenshot Logged in dropdown"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/logged-in-dropdown.png?raw=true)

Login/register dropdown
!["Screenshot register/login dropdown"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/login:register-slideout.png?raw=true)

Individual map page
!["Screenshot Individual map page"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/map-page.png?raw=true)


Map page marker info box
!["Screenshot Map page marker info box"](https://github.com/RyukyuColin/map_app-midterm/blob/master/images/map-page-marker-info-box.png?raw=true)

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

## Needed Fixes / Known Issues

- Using an apostrophe in map title, marker title, or marker description will be edited out before saving the data as it breaks the JSON used to relay this information to the client side javascript files. Need to refactor the code so that the information is called from the database from the client side instead of the server side.
