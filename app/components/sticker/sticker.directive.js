;(function() {

    function stickerDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/sticker/sticker.view.html',
            scope: {
                data: '=',
                position: '=',
                onDelete: '&'
            },
            compile: function() {
                return {
                    post: function(scope, element) {
                        var position = scope.position;

                        if (position) {
                            element.css({
                                position: 'absolute',
                                zIndex: 2,
                                left: position.x + 'px',
                                top: position.y + 'px'
                            });
                        }
                    }
                };
            }
        };
    }

    angular
        .module('photoSticker.sticker')
        .directive('sticker', stickerDirective);
})();