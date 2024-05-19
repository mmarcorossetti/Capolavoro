document.getElementById('search').addEventListener('click', function () {
    // Ottieni i valori delle input
    var keywords = document.getElementById('keywords').value;
    var category = document.getElementById('category').value;
    // Concatena i valori non vuoti con uno spazio
    var combinedValue = [keywords, category].filter(Boolean).join('+');

    // Esegui la chiamata HTTPS utilizzando Promises
    fetchData(combinedValue)
        .then(function (response) {
            // Rimuovi le card esistenti prima di aggiungere quelle nuove
            removeExistingCards();

            // Aggiungi le card in base ai risultati ottenuti
            response.photos.forEach(function (photo) {
                addCard(photo);
            });
        })
        .catch(function (error) {
            // Gestisci gli errori qui
            console.error(error);
        });
});

// Funzione per effettuare la chiamata HTTPS
function fetchData(combinedValue) {
    return new Promise(function (resolve, reject) {
        // Chiave API di Pexels
        const apiKey = 'R6ToC4NYhJX95CdGHidoawPzaiyObZSFoGqUSEM6Mn06tK3JwgixjRri';

        // Costruisci l'URL per la chiamata API
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(combinedValue)}&per_page=40&page=1`;

        // Effettua la chiamata HTTPS utilizzando fetch
        fetch(url, {
            headers: {
                Authorization: apiKey,
            },
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                reject('Errore nella chiamata API. Status: ' + response.status);
            }
        })
        .then(function (data) {
            resolve(data);
        })
        .catch(function (error) {
            reject('Errore nella chiamata API: ' + error.message);
        });
    });
}

// Funzione per rimuovere le card esistenti
function removeExistingCards() {
    var cardContainer = document.getElementById('card-container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
}

function addCard(result) {
    var cardContainer = document.getElementById('card-container');

    var cardCol = document.createElement('div');
    cardCol.className = 'col-md-3';

    var card = document.createElement('div');
    card.className = 'card';

    var image = document.createElement('img');
    image.src = result.src.medium;
    image.alt = result.photographer;
    image.style.width = '100%'; // Larghezza massima della colonna

    var cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    cardContent.innerHTML = `<h3>${result.photographer}</h3><p>${result.description || ''}</p>`;

    card.appendChild(image);
    card.appendChild(cardContent);
    cardCol.appendChild(card);

    cardContainer.appendChild(cardCol);
}
