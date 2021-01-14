const express = require('express');

const axios = require('axios');

const app = express();

const cors = require('cors');

let exchangeRate;

const getExchangeRate = async () => {
    try{
    exchangeRate = await axios.get('https://api.exchangeratesapi.io/latest');
    return exchangeRate
    }
    catch(err){
        return err
    }
}

getExchangeRate()

app.use(cors());
app.use(express.json());

let base;
let currency;
let splittedCurrency;

app.get('/api/rates', (req, res) => {
    
    base = req.query.base;
    currency = req.query.currency;
    splittedCurrency = currency.split(',');

    if(base !== "EUR" || base === "") {
         res.status(404).json({
            error: "the base must be in EURO"
        })
    }

    else {
        let exchange = exchangeRate.data.rates
        let rateObject = {}
        for (const rate in exchange) {
            splittedCurrency.forEach(curr => {
                
                if(rate === curr ){
                    rateObject[rate] = exchange[rate]
                    //  console.log(`${rate}: ${exchange[rate]}`);
                }
            });

    }
    console.log(rateObject)
   res.status(200).json({
        "results": {
            "base": exchangeRate.data.base,
            "date": exchangeRate.data.date,
            "rates": rateObject 
            
        }
   })
}
    
    });

module.exports = app;