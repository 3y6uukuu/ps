;(function() {

    function PhotoAreaController(PhotoAreaService) {
        this.service = PhotoAreaService;

        this.data = {
            photo: this.photo,
            stickers: []
        };

        this.onSelectFile = function(file) {
            this.service.savePhoto(this.data, file);
        };

        this.restoreData = function() {
            this.service.restorePhotoArea(this.data);
        };

        this.startOver = function() {
            this.service.deletePhotoArea(this.data);
        };

        this.dropSuccess = function(droppedStickerData, droppedEvent) {
            this.service.createNewSticker(this.data, droppedStickerData, droppedEvent);
        };

        this.onStickerDelete = function(sticker) {
            this.service.deleteSticker(this.data, sticker);
        };

        this.restoreData();
    }

    angular
        .module('photoSticker.photoArea')
        .controller('PhotoAreaController', PhotoAreaController);
})();