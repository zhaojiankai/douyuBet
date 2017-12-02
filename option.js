var popup = angular.module('popup', []);

popup.controller('mainController', function ($scope) {

  // init settings
  var params = ["roomid","minOdds","oppoMaxOdds","robustMinOdds","robustOppoMaxOdds","noRobustMinute","guessPercent","guessUnit"];
  //var betSetting = JSON.parse(localStorage.betSetting);
  for(var i = 0;i < params.length;i++){
    $scope[params[i]] = betSetting[params[i]];

  }

  // save settings to local storage
  $scope.saveSettings = function() {
    for(var i = 0;i < params.length;i++){
      betSetting[params[i]] = $scope[params[i]];
    }
    betSetting.guessUnit = Number($scope.guessUnit);
    localStorage.betSetting = JSON.stringify(betSetting);
    window.close();
  };
});
