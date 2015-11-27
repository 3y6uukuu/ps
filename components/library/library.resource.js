;(function() {

    function LibraryResource(LocalStorageService) {
        this.localStorageService = LocalStorageService;

        this.createNewSticker = function(sticker) {
            var savedStickers = this.getSavedStickers();
            var data = {};

            savedStickers.push(sticker);

            data.stickers = savedStickers;

            this.localStorageService.set('library', data);

            return sticker;
        };

        this.getSavedStickers = function() {
            var savedStickers = [];
            var savedLibrary = this.localStorageService.get('library');

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

            this.localStorageService.set('library', data);

            return sticker;
        };
    }

    angular
        .module('photoSticker.library')
        .service('LibraryResource', LibraryResource);
})();