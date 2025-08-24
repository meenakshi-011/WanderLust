# 🌍 WanderLust

*WanderLust* is a full-stack travel and stay listing web application that allows users to explore, create, and manage listings of beautiful destinations and accommodations — inspired by Airbnb.

> ✨ Built with Node.js, Express, MongoDB, EJS, Bootstrap, and full authentication using Passport.js.

## 🚀 Live Demo

🌐 [Visit Deployed Website](https://wanderlust-9nby.onrender.com)  
📂 [GitHub Repo](https://github.com/meenakshi-011/WanderLust)



## 🔧 Features

- 🏕 Create, edit, and delete travel listings
- 🧾 Detailed listing pages with images and descriptions
- 🔐 Authentication system (register, login, logout)
- 👤 Authorization (only owners can edit/delete their listings)
- 📸 Cloud image upload (Cloudinary)
- 📍 Map integration using Mapbox (optional)
- 💬 Flash messages for feedback (success/error)
- ⚙ Responsive UI with Bootstrap

## 🛠 Tech Stack

| Technology     | Description                    |
|----------------|--------------------------------|
| *Frontend*   | EJS, HTML, Bootstrap           |
| *Backend*    | Node.js, Express.js            |
| *Database*   | MongoDB, Mongoose              |
| *Auth*       | Passport.js, bcrypt            |
| *Image Upload* | Multer, Cloudinary          |
| *Deployment* | Render (or any cloud platform) |

## 📂 Project Structure

WanderLust/
├── models/ # Mongoose models (User, Listing, Review)
├── routes/ # Express route handlers
├── controllers/ # Controller functions for routes
├── views/ # EJS templates
│ ├── layouts/ # Common layouts (header, footer)
│ ├── listings/ # Listing pages
│ └── users/ # Auth pages (login, register)
├── public/ # Static files (CSS, JS, images)
├── utils/ # Utility functions & middleware
├── app.js # Main application file
├── package.json # Dependencies and scripts
└── README.md

## 📂 API Endpoints

### Listings
- `GET    /listings` → Get all listings  
- `POST   /listings` → Create new listing  
- `GET    /listings/:id` → Get single listing  
- `PUT    /listings/:id` → Update listing  
- `DELETE /listings/:id` → Delete listing  

### Auth
- `POST /register` → Create account  
- `POST /login` → Login user  
- `GET /logout` → Logout user

## 🧪 Testing

Currently, the project does not include automated tests.
You can test the application manually by:

Running the server locally:

npm start


Opening http://localhost:3000 in your browser.

Verifying the following features:

✅ User registration, login, and logout

✅ Create, edit, and delete listings

✅ Authorization (only owners can modify their listings)

✅ Image upload via Cloudinary

✅ Flash messages display correctly

📌 Automated testing with Jest & Supertest can be added in the future for route and API validation.