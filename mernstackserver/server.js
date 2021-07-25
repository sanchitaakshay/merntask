var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

const Customer = require('./app/models/customer.model.js');
 
mongoose.Promise = global.Promise;
 
// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Successfully connected to MongoDB.");   
        const customers = [
            { taxyear: '2020', date: '3/12/2020', 
                      jurisdiction: 'Haris Country TX', name: 'Datagain Inc',parcelid:'23-151',status:'Awaiting information',letter:'Sent',tvalue:'100000',hvalue:'100000'},
            
          ]

        for(let i=0; i<customers.length; i++){

            const customer = new Customer({
                taxyear: customers[i].taxyear,
                date: customers[i].date,
                jurisdiction: customers[i].jurisdiction,
                name: customers[i].name,
                parcelid: customers[i].parcelid,
                status: customers[i].status,
                letter: customers[i].letter,
                tvalue: customers[i].tvalue,
                hvalue:customers[i].hvalue
              });

            // Save a Customer in the MongoDB
            await customer.save();
        }
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

require('./app/routes/customer.router.js')(app);
// Create a Server
var server = app.listen(8080, function () { 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port) 
})