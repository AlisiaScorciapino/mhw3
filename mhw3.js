//keys
const music_api_endpoint='http://ws.audioscrobbler.com/2.0/';
const key_music='YOUR_API_KEY';

const sport_api_endpoint='https://www.thesportsdb.com/api/v1/json/3/';


function OnJson_music(json) {
    console.log('Json ricevuto');

    // Svuoto la libreria
    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    // Leggo il numero di risultati
    const results = json.results.albummatches.album
    let num_results = results.length;

    // Mostrare al massimo 10
    if(num_results > 10)
        num_results = 10;

    // Processa ogni risultato
    for(let i=0; i<num_results; i++)
    {
        // Leggi il documento
        const album_data = results[i]
        // Leggiamo info
        const title = album_data.name;
        const images = album_data.image;
        let selected_image = null;
        for(image of images)
        {
        if(image.size == 'large')
            selected_image = image['#text'];
        }
        // Creiamo il div che conterrà immagine e didascalia
        const album = document.createElement('div');
        album.classList.add('album');
        // Creiamo l'immagine
        const img = document.createElement('img');
        img.src = selected_image;
        // Creiamo la didascalia
        const caption = document.createElement('span');
        caption.textContent = title;
        // Aggiungiamo immagine e didascalia al div
        album.appendChild(img);
        album.appendChild(caption);
        // Aggiungiamo il div alla libreria
        library.appendChild(album);
    }
}


function prevent(event) {
	event.preventDefault();
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
 
// Funzione di ricerca  
function search(event)
{
	event.preventDefault(); // Impedisce il submit del form
  
	const content = document.querySelector('#content').value; // Leggo il valore inserito
  
	// verifico che il testo è stato inserito
    if(content) {
	    const text = encodeURIComponent(content);
		console.log('Eseguo ricerca elementi riguardanti: ' + text);

        const tipo = document.querySelector('#tipo').value;
		console.log('Ricerco elementi di tipo: ' +tipo);

        if(tipo==='music'){
            //fetch
            music_request=music_api_endpoint + '?method=album.search&album=' + text + '&api_key=' + key_music + '&format=json';
            fetch(music_request).then(onResponse).then(OnJson_music);

        }else (tipo==='sport')
        {
            //fetch
            sport_request=sport_api_endpoint + 'all_sports.php';
            console.log('URL ' + sport_request);
            fetch(sport_request).then(onResponse).then(onJson_sport);
        }
    }else{
        alert("Inserisci il testo!");
        }
}

function onResponse(response){
    return response.json();                                      
}


function onJson_sport(json){

    console.log(json);
    const text = document.querySelector('#sport');               
    const sport_value = encodeURIComponent(text.value);
    console.log('Eseguo la ricerca: ' + sport_value);
    text.innerHTML = '';                                         
    let risultato = json.sports.length;
    console.log(risultato);

    for(let i = 0; i < risultato; i++){                          
        const sports = json.sports[i];
        if(sports.strSport === sport_value){
        const type = json.strSport;
        const img = sports.strSportThumb;                        
        const elemento = document.createElement('div');
        elemento.classList.add('sport');
        const copertina = document.createElement('img');
        copertina.src = img;
        const paragrafo = document.createElement('span');
        paragrafo.textContent = type;
        elemento.appendChild(copertina);
        elemento.appendChild(paragrafo);
        const view = document.querySelector('#album-view');
        view.appendChild(elemento);
        }
    }
}  


//Prendo il submit e assegno il listener per la ricerca
const form = document.querySelector('form');
form.addEventListener('#submit',search);