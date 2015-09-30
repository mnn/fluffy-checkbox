"use strict";

angular.module("fluffyCheckbox", []);

angular.module("fluffyCheckbox").directive("fluffyCheckbox", function () {
  return {
    templateUrl: "fluffyCheckbox.template.html",
    scope: {
      "label": "@",
      "value": "="
    },
    controller: "FluffyCheckboxCtrl"
  };
});

angular.module("fluffyCheckbox").provider("FluffyCheckboxService", function () {
  this.$get = function () {
    return this;
  };
  this.innerScale = 1;
  this.animEnableLen = 400;
  this.animDisableLen = 200;
});

angular.module("fluffyCheckbox").controller("FluffyCheckboxCtrl", function ($scope, $element, FluffyCheckboxService) {
  var _this = this;

  if (angular.isUndefined($scope.value)) $scope.value = false;
  var innerElem = angular.element($element[0].querySelector(".fc-inner")); //$element.find(".fc-inner")
  this.flipValue = function () {
    $scope.value = !$scope.value;
    $scope.$apply();
  };
  this.flipValueAfterAnimation = function () {
    _this.changing = false;
    _this.flipValue();
  };
  this.changing = false;
  var fcs = FluffyCheckboxService;
  this.animateFlip = function (fromValue) {
    if (!_this.changing) {
      (function () {
        _this.changing = true;
        var Vel = window.Velocity || $.Velocity;
        if ($scope.value) {
          // true -> false
          Vel(innerElem[0], { opacity: [0, 1], scale: [0, fcs.innerScale] }, { duration: fcs.animDisableLen, complete: _this.flipValueAfterAnimation });
        } else {
          // false -> true
          Vel(innerElem[0], { opacity: [fcs.innerScale, 0] }, { duration: fcs.animEnableLen, complete: _this.flipValueAfterAnimation });
          var secondAnim = function secondAnim() {
            Vel(innerElem[0], { scale: fcs.innerScale }, { duration: fcs.animEnableLen * 0.3, queue: false });
          };
          Vel(innerElem[0], { scale: [fcs.innerScale * 1.6, 0] }, { duration: fcs.animEnableLen * 0.7, queue: false, complete: secondAnim });
        }
      })();
    }
  };
  $scope.clicked = function () {
    _this.animateFlip();
  };
});
"use strict";

angular.module("fluffyCheckbox").run(["$templateCache", function ($templateCache) {
  $templateCache.put("fluffyCheckbox.template.html", "<div class=\"fc-outer\"\n     ng-click=\"clicked()\"\n     ng-class=\"{ \'fc-checked\': value, \'fc-unchecked\': !value }\">\n  <div class=\"fc-inner\"></div>\n</div>\n<div class=\"fc-label\" ng-click=\"clicked()\">{{label}}</div>\n");
}]);