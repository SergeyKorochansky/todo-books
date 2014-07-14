booksApp.factory('fixedWidthService', function(){
    var fixedWidth = true;
    return {
        get: function() {
            return fixedWidth;
        },
        set: function(newValue) {
            return fixedWidth = newValue;
        }
    }
});