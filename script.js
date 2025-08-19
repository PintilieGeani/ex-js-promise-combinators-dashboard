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
    const obj = await response.json()

    return obj
}



async function getDashboardData(query) {
    try{
        // Chiamate api
        const destinationPromise = fetchUrl(`${apiUrl}/destinations?search=${query}`)
        const weatherPromise =  fetchUrl(`${apiUrl}/weathers?search=${query}`)
        const airportPromise = fetchUrl(`${apiUrl}/airports?search=${query}`)
    
        // Array di primises
        const promises = [destinationPromise, weatherPromise, airportPromise]
    
        // Destruturazione
        const [destination, weather, airport] = await Promise.all(promises)
    
        return {
            city: destination[0].name,
            country: destination[0].country,
            temperature: weather[0].temperature,
            weather: weather[0].weather_description,
            airport: airport[0].name
        }
    }
    catch(error){
        throw new Error("Errore nel recupero dei dati del api")
    }

}

const dashboard = getDashboardData("Paris")
.then(dashboard =>{
    console.log("I dati estrtti sono:", dashboard)
    console.log(`${dashboard.city} is in ${dashboard.country}. Today there are ${dashboard.temperature} degrees and the weather is ${dashboard.weather}. The mai airport is ${dashboard.airport}`)
})
.catch((error) => console.error(error))


