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

// const apiUrl = "http://localhost:3333"

// async function fetchUrl(url) {
//     const response = await fetch(url)
//     const obj = await response.json()

//     return obj
// }



// async function getDashboardData(query) {
//     try{
//         // Chiamate api
//         const destinationPromise = fetchUrl(`${apiUrl}/destinations?search=${query}`)
//         const weatherPromise =  fetchUrl(`${apiUrl}/weathers?search=${query}`)
//         const airportPromise = fetchUrl(`${apiUrl}/airports?search=${query}`)

//         // Array di primises
//         const promises = [destinationPromise, weatherPromise, airportPromise]

//         // Destruturazione
//         const [destination, weather, airport] = await Promise.all(promises)

//         return {
//             city: destination[0].name,
//             country: destination[0].country,
//             temperature: weather[0].temperature,
//             weather: weather[0].weather_description,
//             airport: airport[0].name
//         }
//     }
//     catch(error){
//         throw new Error("Errore nel recupero dei dati del api")
//     }

// }

// const dashboard = getDashboardData("Paris")
// .then(dashboard =>{
//     console.log("I dati estrtti sono:", dashboard)
//     console.log(`${dashboard.city} is in ${dashboard.country}. Today there are ${dashboard.temperature} degrees and the weather is ${dashboard.weather}. The mai airport is ${dashboard.airport}`)
// })
// .catch((error) => console.error(error))


// 🎯 Bonus 1 - Risultato vuoto
// Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).


// const apiUrl = "http://localhost:3333"

// async function fetchUrl(url) {
//     const response = await fetch(url)
//     const obj = await response.json()

//     return obj
// }



// async function getDashboardData(query) {
//     try {
//         // Chiamate api
//         const destinationPromise = fetchUrl(`${apiUrl}/destinations?search=${query}`)
//         const weatherPromise = fetchUrl(`${apiUrl}/weathers?search=${query}`)
//         const airportPromise = fetchUrl(`${apiUrl}/airports?search=${query}`)

//         // Array di primises
//         const promises = [destinationPromise, weatherPromise, airportPromise]

//         // Destruturazione
//         const [destination, weather, airport] = await Promise.all(promises)

//         return {
//             city: (destination.length === 0 ? null : destination[0].name),
//             country: (destination.length === 0 ? null : destination[0].country),
//             temperature: (weather.length === 0 ? null : weather[0].temperature),
//             weather: (weather.length === 0 ? null : weather[0].weather_description),
//             airport: (airport.length === 0 ? null : airport[0].name)
//         }
//     }
//     catch (error) {
//         throw new Error("Errore nel recupero dei dati del api")
//     }

// }

// const dashboard = getDashboardData("london")
//     .then(dashboard => {
//         console.log("I dati estrtti sono:", dashboard)
//         console.log(`${dashboard.city == null || dashboard.country == null
//             ? ""
//             : `${dashboard.city} is in ${dashboard.country}.`}
//         ${dashboard.weather == null
//                 ? ""
//                 : `Today there are ${dashboard.temperature} degrees and the weather is ${dashboard.weather}`} 
//         The main airport is ${dashboard.airport == null
//                 ? ""
//                 : dashboard.airport}`)
//     })
//     .catch((error) => console.error(error))



//     🎯 Bonus 2 - Chiamate fallite
// Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

// Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:
// Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
// Stampa in console un messaggio di errore per ogni richiesta fallita.
// Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).


const apiUrl = "http://localhost:3333"

async function fetchUrl(url) {
    const response = await fetch(url)
    const obj = await response.json()

    return obj
}



async function getDashboardData(query) {
    
        // Chiamate api
        const destinationPromise = fetchUrl(`${apiUrl}/destinations?search=${query}`)
        const weatherPromise = fetchUrl(`${apiUrl}/weathers?search=${query}`)
        const airportPromise = fetchUrl(`${apiUrl}/airports?search=${query}`)

        // Array di primises
        const promises = [destinationPromise, weatherPromise, airportPromise]

        // Destruturazione
        const [destination, weather, airport] = await Promise.allSettled(promises)

        // Errori personalizzati
        if(destination.status === "rejected"){
            console.error("Errore nel recupero della destinazione")
        }

        if(weather.status === "rejected"){
            console.error("Errore nel recupero del meteo")
        }

        if(airport.status === "rejected"){
            console.error("Errore nel recupero dell'aeroporto")
        }

        return {
             city: destination.status === 'fulfilled' && destination.value.length > 0
        ? destination.value[0].name
        : null,
    
    country: destination.status === 'fulfilled' && destination.value.length > 0
        ? destination.value[0].country
        : null,
    
    temperature: weather.status === 'fulfilled' && weather.value.length > 0
        ? weather.value[0].temperature
        : null,

    weather: weather.status === 'fulfilled' && weather.value.length > 0
        ? weather.value[0].weather_description
        : null,

    airport: airport.status === 'fulfilled' && airport.value.length > 0
        ? airport.value[0].name
        : null,
        }

}

const dashboard = getDashboardData("London")
    .then(dashboard => {
        console.log("I dati estrtti sono:", dashboard)
        console.log(`${dashboard.city == null || dashboard.country == null
            ? ""
            : `${dashboard.city} is in ${dashboard.country}.`}
        ${dashboard.weather == null
                ? ""
                : `Today there are ${dashboard.temperature} degrees and the weather is ${dashboard.weather}`} 
        The main airport is ${dashboard.airport == null
                ? ""
                : dashboard.airport}`)
    })
    .catch((error) => console.error("Dashbouard non disponibile", error.message))
    
