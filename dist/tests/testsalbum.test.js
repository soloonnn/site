import { Album } from '../mvc_script';
describe('Album', () => {
    it('doit créer un album avec les bonnes propriétés', () => {
        const album = new Album('Mac Miller', 'Circles', 'img/albums/circles.jpg', ['Un album introspectif.', 'Des sonorités apaisantes.'], 'Sorti après la mort de Mac Miller, cet album offre une réflexion poignante.');
        expect(album.artist).toBe('Mac Miller');
        expect(album.title).toBe('Circles');
        expect(album.image).toBe('img/albums/circles.jpg');
        expect(album.reviews.length).toBe(2);
        expect(album.context).toContain('réflexion poignante');
    });
});
