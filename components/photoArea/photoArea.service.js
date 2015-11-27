;(function() {

    function PhotoAreaService(PhotoAreaResource) {
        this.resource = PhotoAreaResource;

        this.createNewSticker = function(data, droppedStickerData, droppedEvent) {
            // Handle delete button click
            if (!droppedStickerData) {
                return;
            }

            var extendedStickerData = {
                id: (new Date()).getTime(),
                position: {
                    x: droppedEvent.x,
                    y: droppedEvent.y
                }
            };

            angular.extend(extendedStickerData, droppedStickerData);

            data.stickers.push(extendedStickerData);

            this.resource.createNewSticker(extendedStickerData);
        };

        this.savePhoto = function(data, file) {
            this.deletePhotoArea(data);

            this.resource.savePhoto(file);

            this.resource.urlSrcPromise.then(function(urls) {
                if (urls && urls.length) {
                    data.photo = urls[0];
                }
            });
        };

        this.restorePhoto = function(data) {
            var savedPhoto = this.resource.restorePhoto();

            if (savedPhoto) {
                data.photo = savedPhoto;
            }
        };

        this.restorePhotoArea = function(data) {
            this.restorePhoto(data);
            this.restoreStickers(data);
        };

        this.restoreStickers = function(data) {
            var savedStickers = this.resource.getSavedStickers();

            if (savedStickers) {
                for (var i = 0; i < savedStickers.length; i++) {
                    data.stickers.push(savedStickers[i]);
                }
            }
        };

        this.deleteSticker = function(data, sticker) {

            var deletedSticker = this.resource.deleteSticker(sticker);

            for (var i = 0; i < data.stickers.length; i++) {
                if (deletedSticker.id === data.stickers[i].id) {
                    data.stickers.splice(i, 1);

                    break;
                }
            }
        };

        this.deletePhoto = function(data) {
            this.resource.deletePhoto();

            /**
             * It's really strange for me, but even after that ng-src="{{photoAreaCtrl.data.photo}}" in view, still displayed previous picture
             * So, I've added ng-show="photoAreaCtrl.data.photo"
             */
            data.photo = undefined;
        };

        this.deleteStickers = function(data) {
            this.resource.deleteStickers(this.stickers);

            data.stickers.length = 0;
        };

        this.deletePhotoArea = function(data) {
            this.deletePhoto(data);
            this.deleteStickers(data);
        };
    }

    angular
        .module('photoSticker.photoArea')
        .service('PhotoAreaService', PhotoAreaService);
})();