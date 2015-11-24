;(function() {

    function PhotoAreaController(PhotoAreaService, PhotoAreaResource) {
        this.service = PhotoAreaService;
        this.resource = PhotoAreaResource;
        this.stickers = [];

        this.restoreData = function() {
            //this.file =
            this.src = this.resource.restoreData();
        };

        this.startOver = function() {
            this.src = null;
            //this.file = null;

            this.resource.localStorage.startOver();
        };

        this.dropSuccess = function(data, event) {
            this.service.createNewSticker(this.stickers, data, event);
        };

        this.onStickerDelete = function(sticker) {
            this.service.deleteSticker(this.stickers, sticker);
        };

        this.onSelectFile = function(file) {
            this.resource.onSelectFile(file);
        };

        this.restoreData();
    }

    angular
        .module('photoSticker.photoArea')
        .controller('PhotoAreaController', PhotoAreaController);
})();