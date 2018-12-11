let port = 1337;
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");



mongoose.connect("mongodb+srv://jonathanemiranda:jaxheW-fowsyt-vyhqo8@jonathanemiranda-ozsyo.mongodb.net/YelpCamp?retryWrites=true");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String, 
	description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);


//Landing Page Route
app.get("/", function(req, res){
	res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
	//GET ALL CAMPGROUNDS FROM DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("index", {campgroundsArray: allCampgrounds});			
		}
	});

});

//CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res){
	let newName = req.body.newName;
	let newImage = req.body.newImage;
	let newDesc = req.body.newDesc;
	let newCampground = {name: newName, image: newImage, description: newDesc};
	//CREATE A NEW CAMPGROUND AND SAVE TO DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

//NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("newCampground");
});

//SHOW - Shows details about a single campground
app.get("/campgrounds/:id", function(req, res){
	//FIND THE CAMPGROUND
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			//RENDER THE SHOW TEMPLATE
			res.render("show", {campground: foundCampground});

		}
	});
});



app.listen(port, function(){
	console.log("The YelpCamp Server Has Started");
});