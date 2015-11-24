;(function() {

    function PhotoAreaController(PhotoAreaService, PhotoAreaResource) {
        this.service = PhotoAreaService;
        this.resource = PhotoAreaResource;
        this.stickers = [];

        this.restoreData = function() {
            var savedData = this.resource.restoreData();

            if (savedData) {
                this.file = null;
                this.src = savedData;
            }

            this.service.restoreStickers(this.stickers);
        };

        this.startOver = function() {
            this.file = null;

            this.resource.startOver();
        };

        this.dropSuccess = function(data, event) {
            this.service.createNewSticker(this.stickers, data, event);
        };

        this.onStickerDelete = function(sticker) {
            this.service.deleteSticker(this.stickers, sticker);
        };

        this.onSelectFile = function(file) {
            this.resource.onSelectFile(file);
            //this.src = null;
        };

        this.restoreData();
    }

    angular
        .module('photoSticker.photoArea')
        .controller('PhotoAreaController', PhotoAreaController);
})();