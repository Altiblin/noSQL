const path = require('path');
const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require("connect-flash");

//Controllers
const createPostController = require('./controllers/Post/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/Post/storePost')
const updatePostController = require('./controllers/Post/updatePost')
const updateStorePostController = require('./controllers/Post/updateStorePost')
const deletePostController = require('./controllers/Post/deletePost')
const getPostController = require('./controllers/Post/getPost')
const createUserController = require("./controllers/User/createUser");
const storeUserController = require('./controllers/User/storeUser');
const loginController = require("./controllers/User/login");
const loginUserController = require('./controllers/User/loginUser');
const logoutController = require("./controllers/User/logout");
const createCategoryController = require('./controllers/Category/createCategory')
const storeCategoryController = require('./controllers/Category/storeCategory')
const createCommentController = require('./controllers/createComment')


//Middlewares
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const storePost = require('./middleware/storePost')

//Connect to mongo and uses
mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))


app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(connectFlash());
const MongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use((req, res, next) => {
    res.locals.auth = req.session.userId;
    next();
});
// app.use((req, res, next) => {
//     if (req.session && req.session.userId && req.session.userId.role) {
//         res.locals.userRole = req.session.userId;
//     } else {
//         res.locals.userRole = '';
//     }
//     next();
// });


app.use('/posts/store', storePost)

//Links
app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", storePost, storePostController);
app.get("/posts/update/:id", updatePostController);
app.get("/posts/delete/:id", deletePostController);
app.post("/posts/updateStore", updateStorePostController);

app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/auth/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/auth/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", logoutController);

app.get("/categories/new", auth, createCategoryController);
app.post("/categories/store", storeCategoryController);

app.post("/post/:id", createCommentController);


app.listen(4000, () => {
    console.log('App listening on port 4000')
});