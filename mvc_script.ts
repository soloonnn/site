class Album {
    artist: string;
    title: string;
    image: string;
    reviews: string[];
    context: string;

    constructor(artist: string, title: string, image: string, reviews: string[], context: string) {
        this.artist = artist;
        this.title = title;
        this.image = image;
        this.reviews = reviews;
        this.context = context;
    }
}

class AlbumView {
    static displayAlbums(albums: Album[]): void {
        const albumGrid = document.querySelector('.album-grid');
        if (!albumGrid) {
            console.error("L'élément album-grid est introuvable dans le DOM.");
            return;
        }

        albumGrid.innerHTML = ''; 
        albums.forEach((album: Album) => {
            const albumElement = document.createElement('div');
            albumElement.className = 'album-case';
            albumElement.innerHTML = `
                <img src="${album.image}" alt="${album.title}">
                <h3>${album.title}</h3>
                <p>Artiste : ${album.artist}</p>
            `;
            albumGrid.appendChild(albumElement);
        });
    }

    static displayReviews(albums: Album[]): void {
        const critiquesSection = document.querySelector('#critiques');
        if (!critiquesSection) return;

        critiquesSection.innerHTML = ''; 
        albums.forEach((album: Album) => {
            const reviewBlock = document.createElement('div');
            reviewBlock.innerHTML = `
                <h3>${album.title} - ${album.artist}</h3>
                <ul>
                    ${album.reviews.map((review: string) => `<li>${review}</li>`).join('')}
                </ul>
            `;
            critiquesSection.appendChild(reviewBlock);
        });
    }

    static displayContexts(albums: Album[]): void {
        const contextSection = document.querySelector('#context');
        if (!contextSection) return;

        contextSection.innerHTML = ''; 
        albums.forEach((album: Album) => {
            const contextBlock = document.createElement('div');
            contextBlock.innerHTML = `
                <h3>${album.title} - ${album.artist}</h3>
                <p>${album.context}</p>
            `;
            contextSection.appendChild(contextBlock);
        });
    }
}

class AlbumController {
    static async loadAlbums(): Promise<void> {
        try {
            const response = await fetch('albums.json');
            const albumData: any[] = await response.json();

            const albums: Album[] = albumData.map((album: any) =>
                new Album(album.artist, album.title, album.image, album.reviews, album.context)
            );

            AlbumView.displayAlbums(albums);
            AlbumView.displayReviews(albums);
            AlbumView.displayContexts(albums);
        } catch (error) {
            console.error('Erreur lors du chargement des albums :', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    AlbumController.loadAlbums();
});
