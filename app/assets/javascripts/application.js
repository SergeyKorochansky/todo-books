//= require angular
//= require angular-resource
//= require ng-rails-csrf
//= require angular-ui-bootstrap
//= require angular-ui-bootstrap-tpls
//= require angular-multi-select
//= require_self
//= require_tree .

var booksApp = angular.module('booksApp', ['ngResource', 'ng-rails-csrf', 'ui.bootstrap', 'multi-select']);
