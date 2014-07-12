booksApp.factory('groupService', function(){
    var groups;
    return {
        getGroups: function() {
            return groups;
        },
        setGroups: function(newGroup) {
            groups = newGroup;
        }
    }
});