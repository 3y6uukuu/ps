;(function() {

    function LibraryController(LibraryService) {
        this.service = LibraryService;
        this.stickers = [];

        this.restoreData = function() {
            this.service.restoreStickers(this.stickers);
        };

        this.createNewSticker = function(sticker) {
            this.service.createNewSticker(this.stickers, sticker);
        };

        this.uploadNewSticker = function() {
            this.service.showUploadNewStickerDialog({
                apply: this.createNewSticker.bind(this)
            });
        };

        this.onStickerDelete = function(sticker) {
            this.service.deleteSticker(this.stickers, sticker);
        };

        this.restoreData();
    }

    angular
        .module('photoSticker.library')
        .controller('LibraryController', LibraryController);
})();