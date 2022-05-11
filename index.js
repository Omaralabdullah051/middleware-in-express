const express = require('express');
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());//third-party middleware
app.use(cors());//third-party middleware
app.use(express.json());//built-in middleware

const adminRouter = express.Router();

const loggerWrapper = (options) => {
    return function (req, res, next) {
        if (options.log) {
            console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} -${req.originalUrl} -${req.protocol} - ${req.ip}`);
            next();
        }
        else {
            throw new Error('Failed log');
        }
    }
}

const logger1 = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} -${req.originalUrl} -${req.protocol} - ${req.ip}`);
    next();
};

const logger2 = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} -${req.originalUrl} -${req.protocol} - ${req.ip}`);
    throw new Error("This is an error");
};

adminRouter.use(loggerWrapper({ log: true }));//configurable middleware (here we can send data)
// adminRouter.use(logger1);//router level middleware
// adminRouter.use(logger2);//router level middleware

adminRouter.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

app.use('/admin', adminRouter);



const myMiddleware1 = (req, res, next) => {
    console.log('I am logging 1');
    next();
}

const myMiddleware2 = (req, res, next) => {
    console.log('I am logging 2');
    next();
}

app.use(myMiddleware1, myMiddleware2);//application level middlewares

app.get('/about', (req, res) => {
    res.send('About');
});

const errorMiddleware = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).send('There was a server side error!');
};

adminRouter.use(errorMiddleware);//error-handling middleware

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
});