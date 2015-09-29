"use strict";

angular.module("app", ["fluffyCheckbox"]).config(function (FluffyCheckboxServiceProvider) {
  var fcs = FluffyCheckboxServiceProvider;
  fcs.animEnableLen = 300;
  fcs.animDisableLen = 150;
});
