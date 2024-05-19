var currentPhotoIndex = 0;
var photos = document.querySelectorAll('.photo');

function showNextPhoto() {
    // verifica se photos è null o undefined
    if (photos === null || photos === undefined) 
        return; 

    photos[currentPhotoIndex].classList.remove('visible');
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    photos[currentPhotoIndex].classList.add('visible');
}
