'use strict';

angular.module('peepoltvApp', ['apiServices'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/channels', {
        templateUrl: 'views/channels.html',
        controller: 'ChannelsCtrl'
      })
      .when('/search-results', {
        templateUrl: 'views/search-results.html',
        controller: 'SearchResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
