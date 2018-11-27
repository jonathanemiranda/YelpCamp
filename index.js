let port = 1337;
let express = require("express");
let app = express();
let bodyParser = require("body-parser");


//Temporary array for campground data. Delete once DB is implemented
let campgroundsArray = [
	{title: "First Title", image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=1051&q=80"},
	{title: "Second Title", image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa6e65fcad07b9a68420c430034f84f2&auto=format&fit=crop&w=1050&q=80"},
	{title: "Third Title", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cf61f7387cf2cb8758d724978fcbd198&auto=format&fit=crop&w=1050&q=80"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgroundsArray: campgroundsArray});
});

app.post("/campgrounds", function(req, res){
	let newName = req.body.newName;
	let newImage = req.body.newImage;
	let newCampground = {title: newName, image: newImage};
	campgroundsArray.push(newCampground);
	res.redirect("/campgrounds");
	console.log(campgroundsArray);
});

app.get("/campgrounds/new", function(req, res){
	res.render("newCampground");
});



app.listen(port, function(){
	console.log("The YelpCamp Server Has Started");
});