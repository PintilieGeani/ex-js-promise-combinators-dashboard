// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).


// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).


// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).


// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.


// Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).


// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"

const apiUrl = "http://localhost:3333"

async function fetchUrl(url) {
    const response = await fetch(url)
    const obj = response.json()

    return obj
}



async function getDashboardData(query) {
    
    const getCity = async () =>{
        const result = await fetchUrl(`${apiUrl}/destinations?search=${query}`)
        const city = result[0].name
        return city
    }
    
    const city = getCity()
    console.log(city)


    const getCountry = async () =>{
        const result = await fetchUrl(`${apiUrl}/destinations?search=${query}`)
        const country = result[0].country
        return country
    }

    const country = getCountry()

    const getTemperature = async () =>{
        const result = await fetchUrl(`${apiUrl}/weathers?search=${query}`)
        const temperature = result[0].temperature
        return temperature
    }

    const temperature = getTemperature()

    const getDescription = async () =>{
        const result = await fetchUrl(`${apiUrl}/weathers?search=${query}`)

        const description = result[0].weather_description
        return description
    }

    const description = getDescription()

    const getAirport = async () =>{
        const result = await fetchUrl(`${apiUrl}/airports?search=${query}`)

        const airport = result[0].name
        return airport
    }

    const airport = getAirport()


    let promises = [city, country, temperature, description, airport]

    const info = await Promise.all(promises)


    const dashboard = {
        city: info[0],
        country:info[1] ,
        temperature:info[2] ,
        description:info[3] ,
        airport:info[4] 
    }
    
    return dashboard

}

const dashboard = getDashboardData("Paris").then((resp) => console.log(resp))

