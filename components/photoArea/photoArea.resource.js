;(function() {

    function PhotoAreaResource(Upload) {
        this.urlSrcPromise = null;

        this.restorePhoto = function() {
            return localStorage.getItem('photoArea');
        };

        this.deletePhoto = function() {
            localStorage.removeItem('photoArea');
        };

        this.savePhoto = function(file) {
            this.urlSrcPromise = Upload.base64DataUrl(file);

            this.urlSrcPromise.then(function(urls) {
                if (urls && urls.length) {
                    localStorage.setItem('photoArea', urls[0]);
                }
            });
        };

        this.createNewSticker = function(sticker) {
            var savedStickers = this.getSavedStickers();
            var data = {};

            savedStickers.push(sticker);

            data.stickers = savedStickers;

            localStorage.setItem('photoAreaStickers', JSON.stringify(data));

            return sticker;
        };

        this.getSavedLibrary = function() {
            var savedLibrary = localStorage.getItem('photoAreaStickers');

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

            localStorage.setItem('photoAreaStickers', JSON.stringify(data));

            //$rootScope.$emit('localstorageAction', 'Some data');

            return sticker;
        };

        this.deleteStickers = function() {
            localStorage.removeItem('photoAreaStickers');
        };
    }

    angular
        .module('photoSticker.photoArea')
        .service('PhotoAreaResource', PhotoAreaResource);
})();