URL Shortener
A simple and efficient URL shortening service built with Node.js, Express, and MongoDB. This application allows users to shorten long URLs, track click analytics, and manage their created short links.

✨ Features
URL Shortening: Convert long, cumbersome URLs into short, shareable links.

Custom Short IDs (Planned/Future): Potentially allow users to specify custom short IDs (e.g., yourdomain.com/mycustomlink).

Click Analytics: Track the total number of clicks for each shortened URL and view detailed visit history (timestamps).

User Authentication: Secure user signup and login system.

User-Specific URLs: Authenticated users can view and manage only the URLs they have created.

Admin Dashboard: An administrative view to see all generated URLs (requires ADMIN role).

Responsive Design: User interface is designed to be accessible and functional across various devices (desktop, tablet, mobile).

🚀 Technologies Used
Backend:

Node.js: JavaScript runtime environment.

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

MongoDB: NoSQL database for storing URLs and user data.

Mongoose: MongoDB object data modeling (ODM) for Node.js.

nanoid: For generating short, unique IDs.

jsonwebtoken (JWT): For user authentication.

bcryptjs: For hashing user passwords securely.

cookie-parser: Middleware to parse HTTP cookies.

dotenv: For loading environment variables from a .env file.

Frontend (Templating):

EJS (Embedded JavaScript): Templating engine for rendering dynamic HTML pages.

HTML5 & CSS3: For structuring and styling the web pages.

JavaScript: For client-side interactivity (though minimal in the current setup).

🛠️ Setup and Installation
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (v14 or higher recommended)

MongoDB (Community Edition or MongoDB Atlas)

Git

1. Clone the Repository
git clone https://github.com/AshutoshBanate008/URLShortner.git
cd URLShortner

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root of your project directory and add the following:

MONGO_URI=mongodb://127.0.0.1:27017/short-url
JWT_SECRET=YOUR_SUPER_SECRET_KEY_HERE

Replace mongodb://127.0.0.1:27017/short-url with your MongoDB connection string if it's different (e.g., for a cloud-hosted MongoDB instance).

Replace YOUR_SUPER_SECRET_KEY_HERE with a strong, random string for your JWT secret. You can generate one online or use a tool.

4. Start MongoDB
Ensure your MongoDB server is running. If you're running it locally, you might start it via:

mongod

(This command might vary based on your MongoDB installation.)

5. Start the Application
node index.js
# Or, if you have nodemon installed for auto-reloading during development:
# nodemon index.js

You should see output similar to:

✅ MongoDB Connected
🚀 Server started at http://localhost:8001

🌐 Usage
Once the server is running, open your web browser and navigate to:

Home Page (requires login): http://localhost:8001/

Signup Page: http://localhost:8001/signup

Login Page: http://localhost:8001/login

Workflow:
Sign Up: Create a new account at http://localhost:8001/signup.

Log In: Log in with your new credentials at http://localhost:8001/login.

Generate Short URL: After logging in, you will be redirected to the home page (http://localhost:8001/). Enter a long URL in the input field and click "Generate". A short URL will be displayed and added to your list.

Test Redirection: Click on the generated short URL (e.g., http://localhost:8001/url/yourshortid) to test if it redirects to the original long URL.

View Analytics: To see the click analytics for a specific short URL, you can visit http://localhost:8001/url/analytics/yourshortid (replace yourshortid with the actual short ID).

Admin Access (Optional)
To access the admin dashboard (http://localhost:8001/admin/urls), you would need to manually update a user's role field in your MongoDB database from "NORMAL" to "ADMIN".

