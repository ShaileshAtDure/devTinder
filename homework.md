# Video 16 Homework

- Create a repository
- Initialize the repository (using npm init)
- known abpout node_modules, package.json, package-lock,json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- what are dependencies
- what is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)

# Video 17 Homework

- Initialize git repository
- Make .gitingnore file
- Create a remote repo on github
- Push a all code to remote origin
- Play with routes and route extensions ex. /hello, /, hellow/2, /xyz
- Order of the routes matter a lot
- Install Postman app and make a workspace/collection and make a test API call
- Wirte logic to handle GET, POST, PATCH, DELETE API calls and test them on Postman
- Explore routing and use of ?, +, (), \* in the routes
- Use of regex in routes /a/, /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

# Video 18 Homework

- Multiple Route Handlers - Play with the code
- undersatnd next () function
- undersatnd next funciton and errors along with res.send()
- practice this app.use("/route", rh, [rh2, rh3], rh4);
- What is Middleware? Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes except /user/login
- Error Handling using app.use("/", (err, req, resp, next) = {});

# Video 19 Homework

- Create a free cluster on MongoDb official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectionDB function and connect to database before starting application on 7777
- Create a userSchema & user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try, catch
