var express = require("express"),

    app = express(),

    bodyParser = require("body-parser"),

    mongoose = require("mongoose"),
    flash = require('connect-flash'),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require("./models/user"),
    methodOverride = require("method-override")
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")
var port = process.env.PORT || 8086
    //seedDB();
mongoose.connect("mongodb+srv://devd:6Hiv@nker@cluster0-bsvef.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.set("view engine", "ejs");
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins the cutest dog",
    resave: false,
    saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



// SCHEMA SETUP




// Campground.create(

//      {

//          name: "Granite Hill", 

//          image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",

//          description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"



//      },

//      function(err, campground){

//       if(err){

//           console.log(err);

//       } else {

//           console.log("NEWLY CREATED CAMPGROUND: ");

//           console.log(campground);

//       }

//     });



app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(port, function() {
    console.log("Yelpcamp about to start");
});