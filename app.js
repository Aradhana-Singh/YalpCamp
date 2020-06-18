var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var  Campground = require("./models/campgrounds");
var  Comment = require("./models/comments");
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
            res.render("campgrounds/index",{campground:campground});
        }
    });
});

app.get('/campgrounds/new',function(req,res){
    res.render("campgrounds/new");
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
    Campground.findById(req.params.id).populate("comments").exec(function(err , foundCamp){
        if(err){
            console.log(err);
        }
        else {
            res.render("campgrounds/show" , {campground : foundCamp});
        }
    });
});


//-----------------------------
//    COMMENT ROUTES
//-----------------------------
app.get('/campgrounds/:id/comments/new' , function(req, res){
    Campground.findById(req.params.id , function(err , camp){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new" , {campground : camp});
        }
    });
    
});

app.post('/campgrounds/:id/comments' , function(req , res){
    Campground.findById(req.params.id , function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }
        else{
    
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + req.params.id);
                }
            });
        }
    });
});





app.listen(5500,function(){
    console.log("The YalpCamp Server Started");
});