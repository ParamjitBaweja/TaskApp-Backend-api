# TaskApp-backend-api

This REST API is hosted at https://param-task-api.herokuapp.com/

This Node.js, Express.js based REST API lets you create a to-do list and store the users and tasks in a MongoDb database

You can use the following routes while requesting from it, from a frontend

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


   
