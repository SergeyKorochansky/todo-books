booksApp.controller("BookCtrl", function ($scope, $http, $resource, groupService) {
    $scope.isCollapsed = true;
    $scope.currentBook = {};
    $scope.currentBookGroups = [];

    $scope.booksResource = $resource("/books/:id.json", { id: "@id" },
        { create: { method: "POST" }, save: { method: "PATCH" } });

    $scope.booksResource.prototype.progress = function () {
        return (this.read_pages / this.total_pages) * 100;
    };

    $scope.booksResource.prototype.progressStyle = function () {
        return {
            'background-size': (100 -this.progress()) + '%,' + this.progress() + '%'
        };
    };

    $scope.progress = function (book) {
        return book.progress();
    };

    $scope.refreshBooks = function () {
        $scope.books = $scope.booksResource.query();
    };

    $scope.deleteBook = function (book) {
        book.$delete().then(function () {
            $scope.books.splice($scope.books.indexOf(book), 1);
        });
    };

    $scope.createBook = function (book) {
        new $scope.booksResource(book).$create().then(function (newBook) {
            $scope.books.push(newBook);
        });
    };

    $scope.updateBook = function (book) {
        book.$save();
    };

    $scope.editOrCreateBook = function (book) {
        $scope.currentBook = book ? book : {};
        $scope.currentBookGroups = groupService.getGroups();
        if (book)
            $scope.currentBookGroups.forEach(function (group) {
                var length = book.groups.length;
                for (var i = 0; i < length; i++) {
                    group.ticked = false;
                    if (book.groups[i].id === group.id) {
                        group.ticked = true;
                        break;
                    }
                }
            });
        else
            $scope.currentBookGroups.forEach(function (group) {
                group.ticked = false;
            });
        $scope.isCollapsed = false;
    };

    $scope.saveEdit = function (book) {
        book.groups = $scope.currentBook.groups = $scope.currentBookGroups.filter(function (group) {
            return group.ticked;
        }).map(function (group) {
            return group.id;
        });
        if (angular.isDefined(book.id)) {
            $scope.updateBook(book);
        } else {
            $scope.createBook(book);
        }
        $scope.isCollapsed = true;
    };

    $scope.cancelEdit = function () {
        if ($scope.currentBook && $scope.createBook.$get) {
            $scope.currentBook.$get();
        }
        $scope.currentBook = {};
        $scope.currentBookGroups = [];
        $scope.isCollapsed = true;
    };

    $scope.refreshBooks();
    $scope.$watch(function () {
        return groupService.getGroups();
    }, function (newGroups) {
        if (newGroups)
            groupService.setGroups(newGroups);
    });
});