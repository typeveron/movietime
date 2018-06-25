var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");

    
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            console.log(data);
            console.log(data.Response);
            // if the Response is "True", pass it to the view
            if (data.Response === "True") {
                res.render("results", {data: data});
            // if not, pass null to the view, which will be handled by ejs to say no movies found
            } else {
                res.render("results", {data: null});
            }
        }
    });
});
 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has Started...");
});


