# DevTinder API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET / profile/view
- POST /profile/edit
- PATCH /profile/password // Forgot password API

## connectionRequestRouter

### POST /request/send/:status/:userId

- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId

### POST /request/review/:status/:requestId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected
While writing API think about you are a security guard of your database
