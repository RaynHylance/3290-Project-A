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

Configure Firebase credentials — copy `.env.example` to `.env` and fill it in. See the Firebase section below for how to obtain the values. The app will build without this, but login and signup will not work.

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

Firebase provides phone-number OTP authentication. No Firebase database is used — all application data is served by JSON Server from `db.json`.

**Credentials are not committed to this repository.** To run the project you must create your own Firebase project and supply your own values:

1. Create a project at https://console.firebase.google.com. Google Analytics is not required.
2. Register a Web app (the `</>` icon) and copy the six `firebaseConfig` values.
3. Copy `.env.example` to `.env` in the project root and fill in those six values.
4. In **Authentication → Sign-in method**, enable the **Phone** provider.
5. In the same panel, under **Phone numbers for testing**, add a fictional number and code — for example `+1 650-555-3434` / `123456`. Test numbers send no SMS, skip the reCAPTCHA challenge, and incur no cost.
6. Restart the dev server. Create React App reads `.env` only at startup.

`localhost` is an authorized domain by default. If OTP fails with no visible error, check **Authentication → Settings → Authorized domains**.

Note that phone numbers are submitted with a `+1` country code prefix; enter ten digits with no country code and no separators.

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

## Attribution

This project builds on the open-source Expedia clone at https://github.com/kumkumdutta/Expedia-clone, originally developed in 2023 under the name "Chalo Ghume" by Kumkum Dutta, Ashish, Amit, Sagar Balsaraf, and Sarim.

This repository repairs and extends that work for SE/CprE 3290 Project A: restored local hotel and flight search, filtering, sorting and pagination; working booking and checkout flows; a functioning admin panel; and Firebase credentials moved out of source control into environment variables. All credit for the original application design and implementation belongs to the upstream authors.