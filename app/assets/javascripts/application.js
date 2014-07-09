//= require angular
//= require angular-resource

angular.module("booksApp", ["ngResource"])
    .constant("baseUrl", "/books/")
    .controller("defaultCtrl", function ($scope, $http, $resource, baseUrl) {
        $http.defaults.headers.common['X-CSRF-Token'] = angular.element(document.head.querySelectorAll("[name=csrf-token]"))[0].content;
        $scope.displayMode = "list";
        $scope.currentBook = null;

        $scope.booksResource = $resource(baseUrl + ":id" + ".json", { id: "@id" },
            { create: { method: "POST" }, save: { method: "PATCH" } });

        $scope.booksResource.prototype.progress = function(){
            return (this.read_pages / this.total_pages) * 100;
        };

        $scope.progress = function(book){
            return book.progress();
        };

        $scope.listBooks = function () {
            $scope.books = $scope.booksResource.query();
        };

        $scope.deleteBook = function (book) {
            book.$delete().then(function () {
                $scope.books.splice($scope.books.indexOf(book), 1);
            });
            $scope.displayMode = "list";
        };

        $scope.createBook = function (book) {
            new $scope.booksResource(book).$create().then(function (newBook) {
                $scope.books.push(newBook);
                $scope.displayMode = "list";
            });
        };

        $scope.updateBook = function (book) {
            book.$save();
            $scope.displayMode = "list";
        };

        $scope.editOrCreateBook = function (book) {
            $scope.currentBook = book ? book : {};
            $scope.displayMode = "edit";
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
            $scope.displayMode = "list";
        };

        $scope.listBooks();
    });
