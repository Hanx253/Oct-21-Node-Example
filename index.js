import express from 'express';

const app = express();

const port = process.env.PORT || 3001

const cities = {
    paris: {
        country: "France"
    },
    tokyo: {
        country: "Japan"
    },
    sydney: {
        country: "Australia"
    },
    cairo: {
        country: "Egypt"
    },
    newYork: {
        country: "USA"
    },
    rio: { 
        country: "Brazil" 
    }
};

app.get('/',(req,res) => {
    //console.log(req.query)
    
    const requestedCountry = req.query.country; 

    const matchingCities = []; 

    for(const city in cities){
        if(cities[city].country == requestedCountry){
            matchingCities.push(city)
        }
    }
    
    console.log(matchingCities)

    res.send(matchingCities)
})

app.get('/city/:city',(req,res) => {
    console.log(req.params.city.substring(1));
 
    for (const city in cities){
         if(city == req.params.city.substring(1)) {
             console.log(`The city of ${city} is located in the country of ${cities[city].country}`)
             res.send(`The city of ${city} is located in the country of ${cities[city].country}`)
             return;  // Ensure the loop stops once the match is found
         }                                                                                                                                                                                                               
    }

    // If no match is found, send a 404 response
    res.status(404).send(`City ${req.params.city.substring(1)} not found.`);
 })

app.listen(port, () => {
    console.log (`my app is listening on port ${port}`)
})