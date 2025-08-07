🌍 WanderLust
A modern travel and adventure platform for explorers to discover, plan, and share unique travel experiences.

*WanderLust* is a full-stack travel and stay listing web application that allows users to explore, create, and manage listings of beautiful destinations and accommodations — inspired by Airbnb.

📌 Project Overview & Purpose
WanderLust is a travel-centric web application designed to connect explorers with breathtaking destinations. The platform allows users to explore curated travel spots, view trip details, and plan their own adventures. The goal is to provide a seamless, engaging, and interactive travel experience for users worldwide.

> ✨ Built with Node.js, Express, MongoDB, EJS, Bootstrap, and full authentication using Passport.js.

## 🚀 Live Demo

🌐 [Visit Deployed Website](https://wanderlust-9nby.onrender.com)  
📂 [GitHub Repo](https://github.com/meenakshi-011/WanderLust)



🧩Features

✨ Interactive UI: Modern and user-friendly design for smooth navigation.
📸 Destination Gallery: Browse travel locations with high-quality images.
📝 Trip Details: View descriptions, costs, and itineraries for destinations.
🔍 Search & Filter: Find trips based on preferences.
🗺️ Map Integration: Visualize locations with integrated maps.
📱 Responsive Design: Works across devices for a seamless experience



🛠 Tech Stack

| Technology     | Description                    |
|----------------|--------------------------------|
| *Frontend*   | EJS, HTML, Bootstrap           |
| *Backend*    | Node.js, Express.js            |
| *Database*   | MongoDB, Mongoose              |
| *Auth*       | Passport.js, bcrypt            |
| *Image Upload* | Multer, Cloudinary          |
| *Deployment* | Render (or any cloud platform) |



🗂 Folder Structure
WanderLust/
│── public/            # Static assets (CSS, JS, Images)
│── views/             # EJS templates
│── routes/            # Express routes
│── models/            # Mongoose schemas
│── config/            # Configuration files (DB, environment)
│── app.js             # Main application file
│── package.json       # Project metadata and dependencies
│── README.md          # Documentation



🧪 Sample Routes
/ → Home page

/destinations → View all travel destinations

/destinations/:id → View specific trip details

/create → Add new travel destination (admin)



⚙ Setup & Installation
1️⃣ Clone the repository:
bash
git clone https://github.com/meenakshi-011/WanderLust.git
cd WanderLust

2️⃣ Install dependencies:
bash
npm install

3️⃣ Configure environment variables:
Create a .env file in the root and add:
ini
PORT=3000
MONGO_URI=your_mongo_db_uri

4️⃣ Run the application:
bash
npm start

5️⃣ Access the app:
Open http://localhost:3000 in your browser.


🚀 Deployment & Hosting

You can deploy the app on platforms like:
Render
Railway
Vercel (for frontend)
Heroku
(Ensure to configure environment variables on the hosting platform)


🧑‍💻 Contribution Guidelines

Fork the repository.
Create a new branch for your feature/fix:
bash
git checkout -b feature-name
Commit your changes and push to your fork.
Open a Pull Request with proper description.

🌐 Future Scope
🚀 Add user authentication & profiles.
📌 Enable trip booking & payment integration.
🌍 Add multilingual support.
🗺️ Integrate live map navigation & travel APIs.
📱 Launch a mobile version of WanderLust.

💙 Made with Passion for Travelers & Explorers