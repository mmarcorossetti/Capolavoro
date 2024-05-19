document.addEventListener('DOMContentLoaded', function () {

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
