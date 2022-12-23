



const getCountryinfo = countryName => {
    axios
        .get(`https://restcountries.com/v2/name/${countryName}`)
        .then(response => {
            console.log('Response from API is:', response)
            const countryDetail = response.data[0];
            console.log("a single country details:", countryDetail)
            document.getElementById('country-name').innerHTML = countryDetail.name;
            document.getElementById('country-capital').innerHTML = countryDetail.capital;
            document.getElementById('country-flag').setAttribute("src", countryDetail.flag)
            document.getElementById('country-language').innerHTML = countryDetail.languages[0].name;

        })
        .catch(err=>console.log(err))
}

document.getElementById('get-country-btn').addEventListener('click', ()=>{
    const userInput = document.getElementById('country-name-input').value;
    getCountryinfo(userInput)
})


