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
function loadAlbums() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('albums.json');
            const albums = yield response.json();
            const albumGrid = document.querySelector('.album-grid');
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
        }
        catch (error) {
            console.error('Erreur lors du chargement des albums :', error);
        }
    });
}
function loadReviews(albums) {
    const critiquesSection = document.querySelector('#critiques');
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
function loadContexts(albums) {
    const contextSection = document.querySelector('#context');
    albums.forEach(album => {
        const contextBlock = document.createElement('div');
        contextBlock.innerHTML = `
            <h3>${album.title} - ${album.artist}</h3>
            <p>${album.context}</p>
        `;
        contextSection.appendChild(contextBlock);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('albums.json');
        const albums = yield response.json();
        loadAlbums();
        loadReviews(albums);
        loadContexts(albums);
    });
}
document.addEventListener('DOMContentLoaded', init);
