booksApp.controller("GroupCtrl", function ($scope, $http, $resource, groupService) {
    $scope.isCollapsed = true;
    $scope.currentGroup = {};

    $scope.groupsResource = $resource("/groups/:id.json", { id: "@id" },
        { create: { method: "POST" }, save: { method: "PATCH" } });

    $scope.name = function (group) {
        return group.name;
    };

    $scope.refreshGroups = function () {
        $scope.groups = $scope.groupsResource.query();
    };

    $scope.deleteGroup = function (group) {
        group.$delete().then(function () {
            $scope.groups.splice($scope.groups.indexOf(group), 1);
        });
    };

    $scope.createGroup = function (group) {
        new $scope.groupsResource(group).$create().then(function (newGroup) {
            $scope.groups.push(newGroup);
        });
    };

    $scope.updateGroup = function (group) {
        group.$save();
    };

    $scope.editOrCreateGroup = function (group) {
        $scope.currentGroup = group ? group : {};
        $scope.isCollapsed = false;
    };

    $scope.saveEdit = function (group) {
        if (angular.isDefined(group.id)) {
            $scope.updateGroup(group);
        } else {
            $scope.createGroup(group);
        }
        $scope.isCollapsed = true;
    };

    $scope.cancelEdit = function () {
        if ($scope.currentGroup && $scope.createGroup.$get) {
            $scope.currentGroup.$get();
        }
        $scope.currentGroup = {};
        $scope.isCollapsed = true;
    };

    $scope.refreshGroups();
    $scope.$watch('groups', function(newGroups){
    if (newGroups)
        groupService.setGroups(newGroups);
    });
});