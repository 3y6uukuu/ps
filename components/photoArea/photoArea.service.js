;(function() {

    function PhotoAreaService(PhotoAreaResource) {
        this.resource = PhotoAreaResource;

        this.onStickerDelete = function(stickers, sticker) {
            for (var i = 0; i < stickers.length; i++) {
                if (sticker.id === stickers[i].data.id) {
                    stickers.splice(i, 1);

                    break;
                }
            }
        };

        this.createNewSticker = function(stickers, sticker, event) {
            // Handle delete button click
            if (!sticker) {
                return;
            }

            sticker.id = (new Date()).getTime();

            stickers.push({
                data: sticker,
                position: {
                    x: event.x,
                    y: event.y
                }
            });
        };
    }

    angular
        .module('photoSticker.photoArea')
        .service('PhotoAreaService', PhotoAreaService);
})();