// Définir l'interface pour les données JSON
interface Album {
    artist: string;
    title: string;
    image: string;
    reviews: string[];
    context: string;
}

// Charger et afficher les albums
async function loadAlbums(): Promise<void> {
    try {
        // Charger les données JSON
        const response = await fetch('albums.json'); // Remplacez par le chemin réel
        const albums: Album[] = await response.json();

        // Sélectionner la section albums dans le DOM
        const albumGrid = document.querySelector('.album-grid') as HTMLElement;

        // Générer dynamiquement le contenu des albums
        albums.forEach(album => {
            const albumElement = document.createElement('div');
            albumElement.className = 'album-case';
            albumElement.innerHTML = `
                <img src="${album.image}" alt="${album.title}">
                <h3>${album.title}</h3>
                <p>Artiste : ${album.artist}</p>
            `;
            albumGrid.appendChild(albumElement);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des albums :', error);
    }
}

// Charger et afficher les critiques
function loadReviews(albums: Album[]): void {
    const critiquesSection = document.querySelector('#critiques') as HTMLElement;

    albums.forEach(album => {
        const reviewBlock = document.createElement('div');
        reviewBlock.innerHTML = `
            <h3>${album.title} - ${album.artist}</h3>
            <ul>
                ${album.reviews.map(review => `<li>${review}</li>`).join('')}
            </ul>
        `;
        critiquesSection.appendChild(reviewBlock);
    });
}

// Charger et afficher les contextes
function loadContexts(albums: Album[]): void {
    const contextSection = document.querySelector('#context') as HTMLElement;

    albums.forEach(album => {
        const contextBlock = document.createElement('div');
        contextBlock.innerHTML = `
            <h3>${album.title} - ${album.artist}</h3>
            <p>${album.context}</p>
        `;
        contextSection.appendChild(contextBlock);
    });
}

// Fonction principale
async function init(): Promise<void> {
    const response = await fetch('albums.json');
    const albums: Album[] = await response.json();

    loadAlbums();
    loadReviews(albums);
    loadContexts(albums);
}

// Appeler la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', init);