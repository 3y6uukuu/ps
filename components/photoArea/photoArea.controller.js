;(function() {

    function PhotoAreaController(PhotoAreaService, PhotoAreaResource) {
        this.service = PhotoAreaService;
        this.resource = PhotoAreaResource;
        this.stickers = [];
        this.photo = [];

        this.restoreData = function() {
            this.service.restorePhotoArea(this.photo, this.stickers);
        };

        this.startOver = function() {
            this.service.deletePhotoArea(this.photo, this.stickers);
            this.file = null;
        };

        this.dropSuccess = function(data, event) {
            this.service.createNewSticker(this.stickers, data, event);
        };

        this.onStickerDelete = function(sticker) {
            this.service.deleteSticker(this.stickers, sticker);
        };

        this.onSelectFile = function(file) {
            this.service.deletePhotoArea(this.photo, this.stickers);
            this.resource.savePhoto(this.photo, file);
        };

        this.restoreData();
    }

    angular
        .module('photoSticker.photoArea')
        .controller('PhotoAreaController', PhotoAreaController);
})();