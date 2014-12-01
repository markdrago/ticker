define([
  'ticker/module'
], function(module) {
  module.directive('countdown', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'ticker/templates/countdown.html',
      scope: {
        onFinish: '&onFinish'
      },
      controller: 'countdownController'
    };
  });

  module.controller('countdownController', [
    '$scope',
    '$interval',
    'countdownService',
    function($scope, $interval, countdownService) {
      var smoothness = 50;
      var countdownMax = 10 * smoothness;

      countdownService.setMaximum(countdownMax);

      var countdownToRefresh = function() {
        countdownService.countDown();

        var countdownValue = countdownService.getValue();
        if (countdownValue <= 0) {
          $scope.onFinish();
          countdownService.restart();
        }

        $scope.percent = (countdownValue * 100) / countdownMax;
      };

      $interval(countdownToRefresh, 1000 / smoothness);
    }
  ]);

  module.service('countdownService', function() {
    var maximum;
    var value;

    var setMaximum = function(max) {
      maximum = max;
      value = maximum;
    };

    var restart = function() {
      value = maximum;
    };

    var getValue = function() {
      return value;
    };

    var countDown = function() {
      value--;
    };

    return {
      setMaximum: setMaximum,
      restart: restart,
      getValue: getValue,
      countDown: countDown
    };
  });
});
