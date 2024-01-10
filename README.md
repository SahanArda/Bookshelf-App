# Bookshelf
Welcome to Project Share, a full-stack application designed for book enthusiasts. Users can effortlessly login and register, gaining access to a personalized space where they can seamlessly perform CRUD operations on the books they're reading, including posting new books, updating book details, and removing completed reads.

## TechStack
- __Backend__: NodeJs NestJs MongoDB
- __Frontend__: ReactJS Bootstrap Sass
- __Libraries/Tools__:
    - bcrypt hashes passwords to protect sensitive user data. 
    - helmet is middleware that adds various HTTP headers to secure your Express application by protecting against common web vulnerabilities.
    - jsonwebtoken is a library for generating and verifying JSON Web Tokens (JWTs).
    - multer used for uploading files.
    - formik simplifies the process of building and validating forms in React applications.
    - react-dropzone provides a dropzone area where users can drag and drop files or click to upload files.
    - react-redux enables the integration of Redux with React components, allowing them to subscribe to the Redux store and dispatch actions.
    - redux-persist allows you to save the state of your Redux store to a storage engine (like localStorage or AsyncStorage) and then rehydrate the state when the application is reloaded.
    - yup used with form libraries like formik to define and validate the shape of data. yup allows you to create validation schemas declaratively and provides methods for validating data against these schemas.
    - MUI for icons and components.

## Project Structure
The project has these key components
- __`Client`__: Contains all the frontend side of the project.
- __`Server`__: Contains all the backend side of the project.

## Functionality
- __Routes:__
    - __`/auth`__: Contains all the information and operations related to auth
    - __`/users`__: Contains all the information and operations related to the users
    - __`/posts`__: Contains all the information and operations related to posts
 
## How to Run Project
### Backend
  - Navigate to __`Server`__

  1. Install dependencies

   ```sh
   npm install
   ```

  2. Start Server
  
   ```sh
   npm run start
   ```
### Frontend
  - Navigate to __`Client`__

  1. Install dependencies

   ```sh
   npm install
   ```

  2. Start Frontend
  
   ```sh
   npm run dev
   ```

## Environment Variables

For this project, you need to set the following environment variables:

- **`PORT`:** Specify the port on which the server will run. Default is 3000.
- **`MONGODB_URI`:** The URI for connecting to your MongoDB database.
- **`JWT_TOKEN`:** Used for securing JSON Web Tokens (JWTs) in your authentication system. It should be a secret key shared between your server and the authentication provider to sign and verify JWTs.

You can create a `.env` file in the project root and define these variables there. Make sure not to commit your `.env` file to version control.

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_TOKEN=value
```

## Features to implement:
- __Search Functionality:__
    - Allow users to quickly search for another user.
- __Pagination:__
    - Implement pagination to prevent users from continuously scrolling.
- __Forgot Password:__
    - Allow users to recover or change their password.
- __Filter:__
    - Create a filter system which allows users to filter the posts and search for a specific type of project.
