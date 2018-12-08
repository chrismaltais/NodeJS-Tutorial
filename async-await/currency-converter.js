const axios = require('axios');

// http://data.fixer.io/api/latest?access_key=7921890d3d46e2ded2c5a41ccc1ab9c1

const getExchangeRate = (from, to) => {
    return axios.get('http://data.fixer.io/api/latest?access_key=7921890d3d46e2ded2c5a41ccc1ab9c1').then((response) => { 
        const euro = 1/ response.data.rates[from];
        const rate = euro * response.data.rates[to];
        return rate
    });
};

const getExchangeRateAsync = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=7921890d3d46e2ded2c5a41ccc1ab9c1');
        if (isNaN(response)) {
            throw new Error(`Unable to get exchange rate from ${from} to ${to}.`)
        }
        const euro = 1/ response.data.rates[from];
        const rate = euro * response.data.rates[to];
        return rate
    } catch (e) {
        throw new Error(`Unable to get exchange rate from ${from} to ${to}.`)
    }
}

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => {return country.name });
    });
}

const getCountriesAsync = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return response.data.map((country) => { country.name });
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`)
    }

}

const convertCurrency = (from, to, amount) => {
    let convertedAmount;
    return getExchangeRate(from, to).then((rate) => {
        convertedAmount = (amount * rate).toFixed(2);
        return getCountries(to);
    }).then((countries) => {
        return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend ${to} in the following countries: ${countries.join(', ')}`;
        
    })
}

const convertCurrencyAsync = async (from, to, amount) => {
    let rate = await getExchangeRateAsync(from, to);
    let countries = await getCountriesAsync(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend ${to} in the following countries: ${countries.join(', ')}`;
}

convertCurrencyAsync('CD', 'USD', 'd').then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e.message); 
})
// getExchangeRate('CAD', 'USD').then((rate) => {
//     console.log(rate)
// });

// getCountriesAsync('USD').then((countries) => {
//     console.log(countries);
// })