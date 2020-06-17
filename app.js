var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var  Campground = require("./models/campgrounds");
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb://localhost/yalp_camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/',function(req, res){
    res.render("landing");
});

app.get('/campgrounds',function(req,res){
    Campground.find({},function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campground:campground});
        }
    });
});

app.get('/campgrounds/new',function(req,res){
    res.render("new");
});
app.post('/campgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var discription = req.body.discription;
    var camps = {name:name,image:image, discription:discription};
    Campground.create(camps,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/:id' ,function(req,res){
    Campground.findById(req.params.id, function(err , foundCamp){
        if(err){
            console.log(err);
        }
        else {
            res.render("show" , {campground : foundCamp});
        }
    });
});
app.listen(5500,function(){
    console.log("The YalpCamp Server Started");
});