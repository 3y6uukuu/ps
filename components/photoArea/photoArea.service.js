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
    }

    angular
        .module('photoSticker.photoArea')
        .service('PhotoAreaService', PhotoAreaService);
})();