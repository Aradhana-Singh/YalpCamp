var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get('/',function(req, res){
    res.render("landing");
});

app.get('/campgrounds',function(req,res){
    var campground = [
        {
            name : "Gorakhpur",
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=500&q=80"
        },
        {
            name : "Ranchi",
            image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        },
        {
            name : "Delhi",
            image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        }
    ]
    res.render("campgrounds",{campground:campground});
});

app.listen(5500,function(){
    console.log("The YalpCamp Server Started");
});