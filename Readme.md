# Back-End Learning
## Setup:
- **npm init** -- Creates a new package.json file in your project directory.
- **git init** -- Initializes a new Git repository in the current directory.
- **git add .** -- Stages all files in the current directory to be committed.
- **git commit -m "Initial commit"** -- Commits the changes with a meaningful commit message.
- **git branch -M main** -- Rename the default branch from "master" to "main".
- **git remote add origin https://github.com/username/repo-name.git** -- Links your local repository to the remote repository on GitHub.
- **git push -u origin main** -- Push the changes to the remote repository.
- **git status** -- To check the status of Git repository.
- *The **.gitkeep** file is a placeholder file used to keep an empty directory in a Git repository.*
- *The **.gitignore** file used to specify files or directories that should be ignored by Git. (ref: .gitignore generator by Mark Andreev)*

**git status > git add . > git commit -m "message" > git push**

## Directory Structure
**Most thing going inside `src` folder**
- **models:** Representations of data structures, typically mirroring database tables.
- **db:** Contains database configuration and connection files.
- **controllers:** Responsible for handling incoming requests and sending responses to the client.
- **middlewares:** Functions that execute between the request and response cycle.
- **routes:** Define the mapping between URLs and controller actions.
- **utils:** Helper functions that can be used throughout the application.

## Dive Into Project:
**[npm i ___ *(in depedencies)*] & [npm i --save-dev/-D ___ *(in dev dependencies)*]**
- **nodemon**  [A tool for Node.js that automatically restarts the server when it detects file changes, streamlining the development process.]
- **prettier** [Prettier is an opinionated code formatter that enforces a consistent style by reformatting code according to its own rules, wrapping lines as needed.]

- **Step-1: Data Modelling** [Model Link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

- **Step-2: DB Connect**
    * **.env** >>> *store PORT and MONGODB_URI*
    * **src/constants.js** >>> *store and export DB_NAME*
    * **src/db/index.js** >>> *mongoose db connection code and export*
    * **src/server.js** >>> *call db connection function and config dotenv*
    
- **Step-3: Custom API Response**
    * **src/app.js** >>> *preparing the server for API requests*
    * **src/utils/asyncHandler.js** >>> *middleware function for handling asynchronous requests*
    * **src/utils/ApiError.js** >>> *It provides additional properties and functionality to handle API-related errors, including a status code, error message, and error details.*
    * **src/utils/ApiResponse.js** >>>  

- **Step-4 Model With Hooks & JWT**
    * **src/models/user-model.js** >>> *A Mongoose schema for a User model that includes fields for authentication, profile information, and a pre-save hook to hash passwords. It also defines instance methods for password verification and token generation*

- **Step-5 Upload Files, Cloudinary & Multer**
    * **src/utils/cloudinary.js** >>> *Uploads a file to Cloudinary, returns the response if successful, and removes the local file if the upload fails, using environment variables for Cloudinary configuration.*
    * **src/middlewares/multer.middlewares.js** >>>

- **Step-6 Router & Controller with Debugging**
    * **src/controllers/user.controler.js** >>> 
    * **src/routes/user.routes.js** >>> 

- **Step-7 Logic Building | Register Controller**


- **Step-8 Postman for Backend**
    * 


## Reference:
- **Guru: Hitesh Choudhary**