var popup = angular.module('popup', []);

popup.controller('mainController', function ($scope) {

  // init settings
  var betSetting = JSON.parse(localStorage.betSetting);
  $scope.roomid = betSetting.roomid;
  $scope.minOdds = betSetting.minOdds;
  $scope.oppoMaxOdds = betSetting.oppoMaxOdds;
  $scope.guessPercent = betSetting.guessPercent;
  $scope.guessUnit = betSetting.guessUnit;

  // save settings to local storage
  $scope.saveSettings = function() {
    betSetting.roomid = $scope.roomid;
    betSetting.minOdds = $scope.minOdds;
    betSetting.oppoMaxOdds = $scope.oppoMaxOdds;
    betSetting.guessPercent = $scope.guessPercent;
    betSetting.guessUnit = Number($scope.guessUnit);
    localStorage.betSetting = JSON.stringify(betSetting);
    window.close();
  };
});
