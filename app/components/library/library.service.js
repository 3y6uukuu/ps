;(function() {

    function LibraryService($mdDialog, LibraryResource) {
        this.$mdDialog = $mdDialog;
        this.resource = LibraryResource;

        this.createNewSticker = function(stickers, sticker) {
            var createdSticker = this.resource.createNewSticker(sticker);

            stickers.push(createdSticker);
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
                if (deletedSticker.id === stickers[i].id) {
                    stickers.splice(i, 1);

                    break;
                }
            }
        };

        this.showUploadNewStickerDialog = function(options) {
            this.$mdDialog.show({
                templateUrl: 'components/library/stickerUploader/stickerUploader.view.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                controller: 'StickerUploaderController',
                controllerAs: 'stickerUploaderCtrl',
                locals: options
            });
        };
    }

    angular
        .module('photoSticker.library')
        .service('LibraryService', LibraryService);
})();