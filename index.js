const express = require("express")
const app = express()
const http = require("https")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
});



app.post("/" , function(req,res){
    
    const query = req.body.cityName;
    const units = "metric"
    const id = "67ec432b86fe71925c9a5a069eb44e42"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units=" + units + "&appid=" + id ;

    http.get(url,function(response){
        console.log(response.statusCode)

        response.on("data",function(data){
            const weatherData = JSON.parse(data)           //to convert json to hexadecimal to actual js object
            const icon = weatherData.weather[0].icon        //JSON.stringify() does the opposite of JSON.parse()                
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDesc+ "</p>") 
            res.write("<h1>The temperature in " + query + " is currently " + temp + " degrees Celsius.</h1>")
            res.write("<img src=" + imageURL + ">" )
            res.send()
        })
    })
});


app.listen(3000,function(){
    console.log("server is running on port 3000")
})