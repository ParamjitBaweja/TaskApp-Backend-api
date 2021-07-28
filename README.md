# TaskApp-backend-api

This REST API is hosted at https://param-task-api.herokuapp.com/

This Node.js, Express.js based REST API lets you create a to-do list and store the users and tasks in a MongoDb database

You can use the following routes while requesting from it, from a frontend

* refer to the models to see the values compatible with each of the routes

Task routes
- POST: /tasks 
  Used to create a new task and store it in the data base
  format: POST (auth, (req, res)) 
  auth, refers to the JWT returned when you sign in 
  
- GET: /tasks
  Get list of all tasks
  format: GET (auth, (req, res)) 

- GET: /tasks/:id
  Find task by its id
  format: GET (auth, (req, res)) 

- PATCH: /tasks/:id
  Find by ID and update
  format: PATCH (auth, (req, res)) 

- DELETE: /tasks
  Delete a particular task by id
  format: DELETE (auth, (req, res)) 

User routes
- POST: /users
  Used to create a new user and store it in the data base and receive JWT for further authentications
  format: POST  (req, res)
  
- POST: /users/login
  login user and receive JWT for further authentications
  format: POST (auth, (req, res)) 
  
- POST: /users/logout
  logout user
  format: POST (auth, (req, res)) 

- POST: /users/logoutAll
  logout user from all devices
  format: POST (auth, (req, res)) 

- GET: /users/me
  get the profile of the logged in user
  format: POST (auth, (req, res)) 

- PATCH: /users/me
  edit user details
  format: PATCH (auth, (req, res)) 

- DELETE: /users/logout
  Allow logged in user to delete their own profile
  format: DELETE (auth, (req, res)) 

- POST: /users/me/avatar
  allow upload of profile picture
  format: POST (auth, (req, res)) 

- DELETE: /users/me/avatar
  Delete profile picture
  format: DELETE (auth, (req, res)) 

- GET: /users/:id/avatar
  Get other user's profile picture, by ID
  format: GET (auth, (req, res)) 

