'use strict';

angular.module('peepoltv.controllers')
  .controller('TermsCtrl', function ($scope, User, session) {

    $scope.self = $scope;

    // Expose the user in the scope
    $scope.user = session.user;

  });