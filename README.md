# Expedia Clone — SE/CprE 3290 Project A

This repository contains the Fall 2026 Project A Expedia Clone for Software Project Management.

The project is based on an existing open-source React/Redux Expedia-style application and has been repaired and extended so its major features work locally using React and JSON Server.

## Features

### User Features

- Landing page
- Firebase phone/OTP login and registration
- Hotel search by destination area
- Hotel check-in and check-out dates
- Hotel price filtering
- Hotel price and rating sorting
- Hotel pagination
- Hotel booking workflow
- Flight route searching
- Flight price filtering
- Flight booking workflow
- Shared hotel/flight checkout
- Persistent demo booking records
- Cart page for hotel and flight selections
- Things To Do destination searching
- Holiday package searching and sorting

### Administrator Features

- Admin dashboard
- Add flights
- Add hotels
- View flight listings
- View hotel listings
- View hotel booking requests
- View flight booking requests
- View registered users
- Review booking/cart workflow status

## Tech Stack

- React
- React Router
- Redux
- Redux Thunk
- Chakra UI
- Axios
- Firebase Authentication
- JSON Server
- HTML
- CSS
- JavaScript

## Local Deployment

Requirements:

- Node.js
- npm
- Git

Clone the repository:

    git clone https://github.com/RaynHylance/3290-Project-A.git
    cd 3290-Project-A

Install dependencies:

    npm install

Start JSON Server in one terminal:

    npm run server

JSON Server runs at:

    http://localhost:8080

Start React in a second terminal:

    npm start

The application runs at:

    http://localhost:3000

## Production Build

Run:

    npm run build

The optimized production files are generated in the build directory.

## Firebase

Firebase is used for phone-number OTP authentication.

Firebase configuration is located at:

    src/01_firebase/config_firebase.js

Phone authentication and localhost must be authorized in the Firebase project for OTP testing.

## Local API Resources

- /users
- /hotel
- /hotelcart
- /flight
- /flightcart
- /giftcards
- /Things_todo

## Booking Disclaimer

Booking and checkout functionality is for a class-project demonstration only.

No payment is collected and no real hotel reservation or airline ticket is created.

## Contributing

See CONTRIBUTING.md for contribution instructions.

## Course

SE/CprE 3290 — Software Project Management
Fall 2026
Class Project A — The Prelude Project