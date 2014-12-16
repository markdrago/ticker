define([
  'ticker/module',
], function(module) {
  module.controller('tickerController', [
    '$scope',
    '$interval',
    '$document',
    'phraseService',
    'socketService',
    'clientService',
    'countdownService',
    function($scope, $interval, $document, phraseService, socketService, clientService, countdownService) {
      socketService.initialize();

      $scope.getCurrentPhrase = phraseService.getCurrentPhrase;

      $scope.showNext = function() {
        phraseService.nextPhrase();
        countdownService.restart();
      };

      $scope.showPrevious = function() {
        phraseService.previousPhrase();
        countdownService.restart();
      };

      $scope.isDarkMode = true;

      $document.on('keyup', function(event) {
        var key = event.keyCode;
        if (key == 18) {                        // alt: toggle dark mode
          $scope.isDarkMode = !$scope.isDarkMode;
        }
        else if (key == 78 && event.ctrlKey) {  // ctrl+n: open create pane
          $scope.isExpanded = true;
        }
        else if (key == 27) {                   // esc: hide create pane
          $scope.isExpanded = false;
        }
        else if (key == 37) {                   // left arrow: show previous
          $scope.showPrevious();
        }
        else if (key == 39) {                   // right arrow: show next
          $scope.showNext();
        }
      });
    }
  ]);
});
