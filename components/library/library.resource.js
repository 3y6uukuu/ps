;(function() {

    function LibraryResource() {
        this.createNewSticker = function(sticker) {
            var savedStickers = this.getSavedStickers();
            var data = {};

            savedStickers.push(sticker);

            data.stickers = savedStickers;

            localStorage.setItem('library', JSON.stringify(data));

            return sticker;
        };

        this.getSavedLibrary = function() {
            var savedLibrary = localStorage.getItem('library');

            return JSON.parse(savedLibrary);
        };

        this.getSavedStickers = function() {
            var savedStickers = [];
            var savedLibrary = this.getSavedLibrary();

            if (savedLibrary && savedLibrary.stickers) {
                savedStickers = savedLibrary.stickers;
            }

            return savedStickers;
        };

        this.deleteSticker = function(sticker) {
            var savedStickers = this.getSavedStickers();
            var data = {};

            for (var i = 0; i < savedStickers.length; i++) {
                if (sticker.id === savedStickers[i].id) {
                    savedStickers.splice(i, 1);

                    break;
                }
            }

            data.stickers = savedStickers;

            localStorage.setItem('library', JSON.stringify(data));

            return sticker;
        };
    }

    angular
        .module('photoSticker.library')
        .service('LibraryResource', LibraryResource);
})();