'use strict';

angular.module('peepoltvApp')
  .controller('GoliveCtrl', function ($scope, streamService, geolocation, $rootScope) {

    // Change the location when is changed
    $scope.$on('locationChanged', function (event, parameters) {
      $scope.coords = parameters.coordinates;
    });

    // Get current location
    geolocation();

    // Modal Options
    $scope.opts = {
      backdropFade: true,
      dialogFade:true,
      keyboard: false,
      backdropClick: false
    };

    // Open de dialog
    $scope.goLiveInitModal = true;

    // Start the broadcast
    $scope.startBroadcast = function(metadata){
      if(!$scope.localStream.permissionsGranted){
        // The mic/cam permissions
        $scope.permissionAlert = true;
        return;
      }

      // Hide the modal
      $scope.goLiveInitModal = false;

      // Star the broadcast
      goOnAir(metadata);

    };

    $scope.stopBroadcast = function(){
      $scope.stream.token = null;
    }

    // Stream data from the init modal
    $scope.streamData = {};

    // Header streaming options
    $scope.streamingOptions = $rootScope.streamingOptions;

    // Get a proportional thumbnail
    var getThumbnailURL = function(video, width, height){
      // Canvas
      var canvas = document.createElement('canvas');
      canvas.ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;

      // Destination size
      var dWidth = width;
      var dHeight = $(video).height()*width/$(video).width();

      // Create and return the image
      canvas.ctx.drawImage( video, 0, 0, dWidth, dHeight);
      return canvas.toDataURL("image/jpeg");
    }

    // Start the transitions
    var goOnAir = function(metadata){
      var streamData = {
        lng: $scope.coords.longitude,
        lat: $scope.coords.latitude,
        thumb: getThumbnailURL($scope.localStream.stream.player.video, 854, 480)
      };

      // Add the metadata
      if(metadata){
        streamData.title = ($scope.streamData.titleCheck)? $scope.streamData.titleData : "";
        // here i need to add tags, geolocation, and channel hashtag logics
      }

      // Post the new stream to the server
      streamService.resource.new(streamData, function(data){

        $scope.stream = data;
      });
    };

  });
