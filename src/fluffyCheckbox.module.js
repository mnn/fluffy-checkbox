angular.module("fluffyCheckbox", [])

angular.module("fluffyCheckbox")
  .directive("fluffyCheckbox", function () {
    return {
      templateUrl: "fluffyCheckbox.template.html",
      scope: {
        "label": "@",
        "value": "="
      },
      controller: "FluffyCheckboxCtrl"
    }
  })

angular.module("fluffyCheckbox")
  .provider("FluffyCheckboxService", function () {
    this.$get = function () { return this }
    this.innerScale = 1
    this.animEnableLen = 400
    this.animDisableLen = 200
  })

angular.module("fluffyCheckbox")
  .controller("FluffyCheckboxCtrl", function ($scope, $element, FluffyCheckboxService) {
    if (angular.isUndefined($scope.value)) $scope.value = false
    let innerElem = angular.element($element[0].querySelector(".fc-inner")) //$element.find(".fc-inner")
    this.flipValue = () => {
      $scope.value = !$scope.value
      $scope.$apply()
    }
    this.flipValueAfterAnimation = () => {
      this.changing = false
      this.flipValue()
    }
    this.changing = false
    let fcs = FluffyCheckboxService
    this.animateFlip = (fromValue) => {
      if (!this.changing) {
        this.changing = true
        let Vel = window.Velocity || $.Velocity
        if ($scope.value) {
          // true -> false
          Vel(
            innerElem[0],
            {opacity: [0, 1], scale: [0, fcs.innerScale]},
            {duration: fcs.animDisableLen, complete: this.flipValueAfterAnimation}
          )
        } else {
          // false -> true
          Vel(
            innerElem[0],
            {opacity: [fcs.innerScale, 0]},
            {duration: fcs.animEnableLen, complete: this.flipValueAfterAnimation}
          )
          let secondAnim = function () {
            Vel(
              innerElem[0],
              {scale: fcs.innerScale},
              {duration: fcs.animEnableLen * 0.3, queue: false}
            )
          }
          Vel(
            innerElem[0],
            {scale: [fcs.innerScale * 1.6, 0]},
            {duration: fcs.animEnableLen * 0.7, queue: false, complete: secondAnim}
          )
        }
      }
    }
    $scope.clicked = () => {
      this.animateFlip()
    }
  })
