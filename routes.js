const express = require('express');

const axios = require('axios');

const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/api/rates', (req, res) => {

    let base = req.query.base;
    let currency = req.query.currency;
    let splittedCurrency = currency.split(',');
    
    axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
    .then(
        (respond) => {

           let exchangeRate = respond;

           if(base === "" || currency==="") {
            res.status(404).json({
               error: "the url is incorrect"
           })
       }

       else {
        let exchange = exchangeRate.data.rates
        let rateObject = {}
        for (const rate in exchange) {
            splittedCurrency.forEach(curr => {
                
                if(rate === curr ){
                    rateObject[rate] = exchange[rate]
                }
            });

    }

   res.status(200).json({
        "results": {
            "base": exchangeRate.data.base,
            "date": exchangeRate.data.date,
            "rates": rateObject 
            
        }
   })
}
        
        })
    
    });

module.exports = app;