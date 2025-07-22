# 🌍 WanderLust

WanderLust is a full-stack travel and accommodation listing web application, inspired by Airbnb. It allows users to explore, create, and review travel destinations. The app uses authentication and authorization to ensure secure and personalized user experiences.

> ✨ Built with Node.js, Express, MongoDB, EJS, Bootstrap, and full authentication using Passport.js.

## 🚀 Live Demo

🌐 [Visit Deployed Website](https://wanderlust-9nby.onrender.com)  
📂 [GitHub Repo](https://github.com/meenakshi-011/WanderLust)



## ✨ Features
- 🏕️ Create, Edit & Delete Listings
- 📷 Upload Images (Cloudinary)
- 🧾 Detailed Listing Pages
- 🔐 User Authentication & Authorization (Passport.js)
- 📝 Review & Rating System
- 📬 Flash Messages for Feedback
- 📍 Location Input with Mapbox Integration
- 🖥️ Responsive UI using Bootstrap


## 🛠 Tech Stack

| Technology     | Description                    |
|----------------|--------------------------------|
| *Frontend*   | EJS, HTML, Bootstrap           |
| *Backend*    | Node.js, Express.js            |
| *Database*   | MongoDB, Mongoose              |
| *Auth*       | Passport.js, bcrypt            |
| *Image Upload* | Multer, Cloudinary          |
| *Deployment* | Render (or any cloud platform) |

## Project Structure
```bash
WanderLust-Gssoc/
├── models/              # Mongoose models (User, Listing, Review)
├── routes/              # All Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates
│   ├── includes/        # Navbar, Footer, Flash
│   ├── layouts/         # Boilerplate layout
│   ├── listings/        # CRUD views
│   ├── users/           # Login / Signup
│   └── error.ejs
├── public/              # Static files
│   ├── css/
│   └── js/
├── utils/               # Custom error handling
├── middleware.js        # Middleware for auth & validation
├── schema.js            # Joi validation schemas
├── app.js               # Main server file
└── README.md
```

## Setup Instructions
1. Clone the repository
```bash
git clone https://github.com/your-username/WanderLust.git
cd WanderLust
```

2. Install dependencies
```bash
npm install
```

3. Setup Environment Variables
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
```

4. Start MongoDB & the server
```bash
mongod
node app.js
```

5. Visit the app
```bash
Open http://localhost:8080
```

## 🧪 Sample Routes
- /signup → Register a new user
- /login → User login
- /listings → Show all listings
- /listings/new → Create a new listing (authenticated)
- /listings/:id → View single listing
- /listings/:id/edit → Edit your listing
- /listings/:id/reviews → Post a review

## 🚧 Future Enhancements
- 🌍 Integrate full Mapbox location preview
- 💬 Comment threads and likes
- 💼 Admin panel for listings moderation
- 🌐 Internationalization

## 🤝 Contribution Guide
1. Fork the repo
2. Create a new branch (git checkout -b feature-name)
3. Make your changes
4. Commit (git commit -m 'added new feature')
5. Push (git push origin feature-name)
6. Open a Pull Request




