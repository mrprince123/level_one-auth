const mongoose = require('mongoose');
const experss = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
// const UserModel = require('./models/User');
const app = experss();


app.use(experss.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/againNewUserDB', {useNewUrlParser : true});

const userSchema = {
    email : String,
    password : String
};

const User = new mongoose.model("User", userSchema);

app.get('/', function (req, res) {
    res.render('home');
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});


app.post('/register', function (req, res) {
    const newUser = new User({
        // name: req.body.name,
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function (err) {
        if (err) {
            console.log("This is the error : " + err);
        } else {
            res.render("secrets");
        }
    });
});



app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                } else {
                    res.render("wrong");
                }
            }
        }
    });
});

app.listen(3000, function () {
    console.log("Server is up and running on port 3000");
});