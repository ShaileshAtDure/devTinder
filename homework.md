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

# Video 20 Homework

- Difference between JS Object and JSON Object
- Add the express.json middleware to your app
- Make your signup API dynamic to recive data from the end user
- User.findOne with duplicate email ids, which object returned
- API Get user by email
- API - Feed API - GET/feed - get all the users from the database
- Create a API get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- Create a update a user API
- Explore the Mongoose Documentation for Model methods
- What are options in a Model. findOneAndUpdate method, explore more about it
- Create a API which update a user with emailId

# Video 21 Homework

- Explore schematype options from the documetion
- Add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improves the DB schema - PUT all appropiate validations on each field in Schema
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post api
- DATA Sanitizing - Add API validation for each field
- Install validator
- Explore validator library functions and Use validator functions for password, email, URL
- NEVER TRUST req.body

# Video 22 Homework

- Validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is excrupted password
- Create login API
- Compare passwords and throw errors if email or password is invalid

# Video 23 Homework

- Install cookie-parser
- Just send a dummy cookie to user
- Create GET /profile API and check if you get the cookies back
- Install jsonwebtoken
- In login API, after email and password validation create a JWT token and send it to user in cookies
- Read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)

# Video 24 Homework

- Explore Tinder APIs
- Create a list of all API you can think of in Dev Tinder
- Group mulitple routes under respective routers
- Read documentation for express.Router
- Create router folder for managing auth,profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Make you validate all data in every POST, PATCH apis

# Video 25 Homework

- Create Connection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about ALL corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query/eq/
- Schema.pre("save") function
- Read more about indexes in MongoDB
- Why do we need index in DB ?
- What is the advantages and disadvantage of creating index ?
- Read this article about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES IF YOU LEAVE CORNER CASES THEN ATTACKER CAN ATTACK YOUR CORNER CASES AND DISTROY YOUR DATA.

# Video 26 Homework

- Write code with proper validations for POST POST /request/review/:status/:requestId API
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
