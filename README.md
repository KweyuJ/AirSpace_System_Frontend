## AirEscape
AirEscape is web application that helps users book flights and hotel locally.

# Project Name AirEscape
Project Description AirEscape is a web application that helps users book flights and hotel locally.

# Contributors
-Joy Kweyu
-Ian Njau
-Charles Mumo
-Stacy Kimilu
-Erick Ndirangu
-Wyclife Munyes

# AirEscape

## Overview
AirEscape is a web application that helps users book flights and hotel locally. The application allows users to
search for flights and hotels, view prices, and book their preferred options.

## Features
- Flight Search
- Hotel Search
- Booking
- Payment Gateway(Mpesa)
- User Profile

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js                      │              
 

# Project Structure
Airspace_system_frontend/
├── node_modules
├── public/
│   │  
│   ├── src/
│   │   ├── components
            ├── About.jsx
            ├── Aboutus.css
            ├── AdminRoute.jsx
            ├── App.css
            ├── Confirmation.jsx
            ├── ContactUs.jsx
            ├── Dashboard.jsx
            ├── Dashboard.css
            ├── FlightResults.jsx
            ├── Flights.jsx
            ├── FlightSection.css
            ├── FlightSection.jsx
            ├── Generateformpdf.jsx
            ├── Home.jsx
            ├── Hotelreservationform.jsx
            ├── Hotels.jsx
            ├── HotelsSection.css
            ├── HotelsSection.jsx
            ├── Login.jsx
            ├── PassengerDetails.jsx
            ├── ProtectedRoute.jsx
            ├── SignUp.jsx
            ├── SingleHotel.jsx
        ├──asset
            └── png photos
        ├──context
            └── FlightContext
        ├── App.jsx
        ├──index.css
        ├──main.jsx        
        
├── .eslintrc.cjs            
├── .gitignore  
├── ndex.html
├── package-lock.json
├── package.json
├── vite.config.js                                  
└── README.md

# Features
-Hotel and Accommodation Booking: A wide range of options from hotels, apartments, and hostels to unique stays like villas and cabins.
-Flight Booking: Users can search and book flights from various airlines.
-Flexible Booking Options: Free cancellation and pay later options for many bookings.
--These features are designed to provide a comprehensive travel booking experience.

# Installation
-Follow these steps to install and run the AirEscape application on your local machine. Prerequisites

  -Python 3.8 installed on your system.
  -Pipenv for managing dependencies.

Steps

1.Clone the Repository:
git clone git@github.com:KweyuJ/AirSpace_System_Frontend.git
cd AirSpace_System_Frontend

2.Set Up Virtual Environment: Ensure pipenv is installed.
  If not, install it using: 
  pip install pipenv

3.Install Dependencies: Use Pipenv to install all    necessary packages
  pipenv install

4.Activate the Virtual Environment:
  pipenv shell

5.Initialize the Database: Run the script to create the required tables in the database:
python seed.py

6.Run the Application from the AirSpace_System_Backend: Launch the application:
    python app.py

7.Then run this from here
npm run dev 
 
# License
©2024 FitMind. This project is licensed under the MIT License. Contact

For any questions or feedback, please contact us at:
-iannjau80@gmail.com






