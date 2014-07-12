booksApp.controller("BookCtrl", function ($scope, $http, $resource) {
    $scope.currentBook = {};

    $scope.booksResource = $resource("/books/:id.json", { id: "@id" },
        { create: { method: "POST" }, save: { method: "PATCH" } });

    $scope.booksResource.prototype.progress = function () {
        return (this.read_pages / this.total_pages) * 100;
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
    };

    $scope.saveEdit = function (book) {
        if (angular.isDefined(book.id)) {
            $scope.updateBook(book);
        } else {
            $scope.createBook(book);
        }
    };

    $scope.cancelEdit = function () {
        if ($scope.currentBook && $scope.createBook.$get) {
            $scope.currentBook.$get();
        }
        $scope.currentBook = {};
    };

    $scope.refreshBooks();
});