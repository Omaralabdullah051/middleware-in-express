////////////////////?Middleware:////////////////////////////
//*Middleware is nothing but a function that have access to req, res object and next function.

//?What can middleware does:
//*1. executes any code.
//*2. can change req and res objects.
//*3. can end request/response cycle.
//*4. call next middleware by next().
//*5. throw & catch errors.

//?Types of middleware:
//*1. application level middleware.
//*2. router level middleware.
//*3. error-handling middleware.
//*4. built-in middleware (express.json()).
//*5. third-party-middleware (cors());
