const express = require('express');

const axios = require('axios');

const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

let exchangeRate;

const getExchangeRate = async (base) => {
    //console.log(base)
    try{
    exchangeRate = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
    return exchangeRate
    }
    catch(err){
        return err
    }
}


app.get('/api/rates', (req, res) => {
        
    let base;
    let currency;
    let splittedCurrency;
    base = req.query.base;
    currency = req.query.currency;
    splittedCurrency = currency.split(',');

     getExchangeRate(base)
    console.log(exchangeRate)

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
    
    });

module.exports = app;