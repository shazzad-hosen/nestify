# 🏡 Nestify
🔗 Visit here: [Nestify](https://nestify-mvgw.onrender.com/)

A **modern**, **user-friendly** stay-booking platform inspired by **Airbnb**.

Nestify is a full-stack web application that allows users to create, browse, and manage property listings. It’s built with Node.js, Express, MongoDB, and EJS, featuring image uploads, authentication, user profiles, and a clean Bootstrap-styled UI.

# 🚀 Features

🧑‍💻 Core Functionality

- User authentication (signup, login, session management)

- Create, edit, delete property listings

- Upload images using Cloudinary + Multer

- View detailed listing pages

- Review system for listings

- Search listings by keyword

- User profile page with owned listings

🎨 UI/UX

- Responsive design using Bootstrap

- Clean, modern layout inspired by Airbnb

- Flash messages for actions (success/error)


🗄️ Backend & Database

- Node.js + Express server

- MongoDB for data storage

- Mongoose models and validation

- Input sanitization & server-side validation

- Rate limiter for extra security

🛠️ Tech Stack

Frontend:

- HTML

- CSS

- Bootstrap

- EJS Templates

Backend:

- Node.js

- Express.js

Database:

- MongoDB

- Mongoose

Other Tools:

- Multer (memory storage)

- Cloudinary (image hosting)

- Express-Session

- Connect-Flash

- Method-Override

- dotenv

- Joi
  
- PassportJS

📂 Folder Structure
```
Nestify
├─ LICENSE
├─ README.md
├─ app.js
├─ cloudConfig.js
├─ controllers
│  ├─ listings.controller.js
│  ├─ profile.controller.js
│  ├─ reviews.controller.js
│  ├─ search.controller.js
│  └─ users.controller.js
├─ init
│  ├─ data.js
│  └─ index.js
├─ middlewares
│  ├─ preventLoggedIn.js
│  ├─ preventUsers.js
│  ├─ saveOriginalUrl.js
│  ├─ validateImageSize.js
│  ├─ validateListingOwner.js
│  ├─ validateListings.js
│  ├─ validateReviews.js
│  ├─ validateReviewsAuthor.js
│  └─ validateUser.js
├─ models
│  ├─ listing.model.js
│  ├─ review.model.js
│  └─ user.model.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ CSS
│  │  ├─ rating.css
│  │  └─ style.css
│  └─ JavaScript
│     └─ toggler.js
├─ routes
│  ├─ listings.js
│  ├─ profile.js
│  ├─ review.js
│  ├─ search.js
│  └─ users.js
├─ schema.js
├─ utils
│  ├─ ExpressError.js
│  └─ wrapAsync.js
└─ views
   ├─ error.ejs
   ├─ includes
   │  ├─ flash.ejs
   │  ├─ footer.ejs
   │  └─ navbar.ejs
   ├─ layouts
   │  └─ boilerplate.ejs
   ├─ listings
   │  ├─ edit.ejs
   │  ├─ index.ejs
   │  ├─ new.ejs
   │  ├─ resultsPage.ejs
   │  └─ show.ejs
   └─ users
      ├─ editProfile.ejs
      ├─ login.ejs
      ├─ ownedListings.ejs
      ├─ profile.ejs
      ├─ signup.ejs
      └─ userListings.ejs
```

⚙️ Installation & Setup
```bash
git clone https://github.com/shazzad-hosen/nestify.git
cd nestify
```
2️⃣ Install dependencies
```bash
npm install
```
3️⃣ Set up environment variables

Create a .env file:
```ini
PORT=8080
SECRET=secret-message-for-sessions
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloud-api-key
CLOUDINARY_API_SECRET=your-cloud-secret
ATLAS_DB_URL=your-online-db-url
```
4️⃣ Run the server
```bash
nodemon app.js
```
Visit: http://localhost:8080

🔮 Future Improvements

- Add booking/payment system

- Add wishlist / favorites

- Add map integration (Mapbox / Leaflet)

- Dark mode

- Admin dashboard

- Paging + filtering for large datasets

📜 License

MIT License

## 🙏 Acknowledgements
- Inspired by Airbnb’s clean UI
- Thanks to MDN, StackOverflow, and Node.js documentation
- Cloudinary for image storage

## 📬 Contact
If you want to connect or have questions:

📧 Email: mdshazzadhosenzisan@gmail.com  
 
🔗 Facebook: [Md. Shazzad Hosen Zisan](https://m.facebook.com/shazzadhosenzisan/)

## ⭐ Support
If you like this project, consider giving it a star!  


