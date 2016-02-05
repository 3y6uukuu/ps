;(function() {

    function PhotoAreaResource(LocalStorageService, Upload) {
        this.localStorageService = LocalStorageService;
        this.urlSrcPromise = null;

        this.savePhoto = function(file) {
            this.urlSrcPromise = Upload.base64DataUrl(file);

            this.urlSrcPromise.then(function(urls) {
                if (urls && urls.length) {
                    this.localStorageService.set('photoArea', urls[0]);
                }
            }.bind(this));
        };

        this.createNewSticker = function(sticker) {
            var savedStickers = this.getSavedStickers();
            var data = {};

            savedStickers.push(sticker);

            data.stickers = savedStickers;

            this.localStorageService.set('photoAreaStickers', data);

            return sticker;
        };

        // TODO: check it
        this.getSavedStickers = function() {
            var savedStickers = [];
            var savedPhotoAreaStickers = this.localStorageService.get('photoAreaStickers');

            if (savedPhotoAreaStickers && savedPhotoAreaStickers.stickers) {
                savedStickers = savedPhotoAreaStickers.stickers;
            }

            return savedStickers;
        };

        this.restorePhoto = function() {
            return this.localStorageService.get('photoArea');
        };

        this.deletePhoto = function() {
            this.localStorageService.remove('photoArea');
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

            this.localStorageService.set('photoAreaStickers', data);

            return sticker;
        };

        this.deleteStickers = function() {
            this.localStorageService.remove('photoAreaStickers');
        };
    }

    angular
        .module('photoSticker.photoArea')
        .service('PhotoAreaResource', PhotoAreaResource);
})();