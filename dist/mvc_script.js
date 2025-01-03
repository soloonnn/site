"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumController = exports.AlbumView = exports.Album = void 0;
class Album {
    constructor(artist, title, image, reviews, context) {
        this.artist = artist;
        this.title = title;
        this.image = image;
        this.reviews = reviews;
        this.context = context;
    }
}
exports.Album = Album;
class AlbumView {
    static displayAlbums(albums) {
        const albumGrid = document.querySelector('.album-grid');
        if (!albumGrid) {
            console.error("L'élément album-grid est introuvable dans le DOM.");
            return;
        }
        albumGrid.innerHTML = '';
        albums.forEach((album) => {
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
    static displayReviews(albums) {
        const critiquesSection = document.querySelector('#critiques');
        if (!critiquesSection)
            return;
        critiquesSection.innerHTML = '';
        albums.forEach((album) => {
            const reviewBlock = document.createElement('div');
            reviewBlock.innerHTML = `
                <h3>${album.title} - ${album.artist}</h3>
                <ul>
                    ${album.reviews.map((review) => `<li>${review}</li>`).join('')}
                </ul>
            `;
            critiquesSection.appendChild(reviewBlock);
        });
    }
    static displayContexts(albums) {
        const contextSection = document.querySelector('#context');
        if (!contextSection)
            return;
        contextSection.innerHTML = '';
        albums.forEach((album) => {
            const contextBlock = document.createElement('div');
            contextBlock.innerHTML = `
                <h3>${album.title} - ${album.artist}</h3>
                <p>${album.context}</p>
            `;
            contextSection.appendChild(contextBlock);
        });
    }
}
exports.AlbumView = AlbumView;
class AlbumController {
    static loadAlbums() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('albums.json');
                const albumData = yield response.json();
                const albums = albumData.map((album) => new Album(album.artist, album.title, album.image, album.reviews, album.context));
                AlbumView.displayAlbums(albums);
                AlbumView.displayReviews(albums);
                AlbumView.displayContexts(albums);
            }
            catch (error) {
                console.error('Erreur lors du chargement des albums :', error);
            }
        });
    }
}
exports.AlbumController = AlbumController;
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        AlbumController.loadAlbums();
    });
}
