;(function() {

    function PhotoAreaService(PhotoAreaResource) {
        this.resource = PhotoAreaResource;

        this.createNewSticker = function(stickers, sticker, event) {
            // Handle delete button click
            if (!sticker) {
                return;
            }

            sticker.id = (new Date()).getTime();

            var data = {
                data: sticker,
                position: {
                    x: event.x,
                    y: event.y
                }
            };

            stickers.push(data);

            this.resource.createNewSticker(data);
        };

        this.restorePhoto = function(photo) {
            var savedPhoto = this.resource.restorePhoto();

            if (savedPhoto) {
                photo.push(savedPhoto);
            }
        };

        this.restorePhotoArea = function(photo, stickers) {
            this.restorePhoto(photo);
            this.restoreStickers(stickers);
        };

        this.restoreStickers = function(stickers) {
            var savedStickers = this.resource.getSavedStickers();

            if (savedStickers) {
                for (var i = 0; i < savedStickers.length; i++) {
                    stickers.push(savedStickers[i]);
                }
            }
        };

        this.deleteSticker = function(stickers, sticker) {
            var deletedSticker = this.resource.deleteSticker(sticker);

            for (var i = 0; i < stickers.length; i++) {
                if (deletedSticker.id === stickers[i].data.id) {
                    stickers.splice(i, 1);

                    break;
                }
            }
        };

        this.deletePhoto = function(photo) {
            this.resource.deletePhoto();
            photo.length = 0;
        };

        this.deleteStickers = function(stickers) {
            stickers.length = 0;

            this.resource.deleteStickers(this.stickers);
        };

        this.deletePhotoArea = function(photo, stickers) {
            this.deletePhoto(photo);
            this.deleteStickers(stickers);
        };
    }

    angular
        .module('photoSticker.photoArea')
        .service('PhotoAreaService', PhotoAreaService);
})();