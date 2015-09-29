fluffy-checkbox
===============
Fluffy checkbox is a very simple implementation of a classic checkbox with nice animation.

Dependencies
------------
- [AngularJS](https://angularjs.org/), expectably
- [Velocity.js](http://julian.com/research/velocity/)

Download
--------
Grab (preferably minified) `.js` and `.css` from `dist` directory.

Usage
-----
Include dependencies and directive files like this:
```
    <script src="https://code.angularjs.org/1.4.3/angular.js"></script>
    <script src="https://rawgit.com/julianshapiro/velocity/master/velocity.min.js"></script>

    <link rel="stylesheet" href="vendor/fluffyCheckbox/fluffyCheckbox.min.css"/>
    <script src="vendor/fluffyCheckbox/fluffyCheckbox.min.js"></script>
```

and add dependency on fluffyCheckbox module to your app.
```
angular.module("app", ["fluffyCheckbox"]);
```

You can also configure animation lengths.
```
angular.module("app")
.config(function (FluffyCheckboxServiceProvider) {
  var fcs = FluffyCheckboxServiceProvider;
  fcs.animEnableLen = 300;
  fcs.animDisableLen = 150;
});
```

Inserting the checkbox is then easy:
```
<fluffy-checkbox label="checkbox 1" value="ch1"></fluffy-checkbox>
```
Attribute `label` is a text label and `value` is a variable reflecting checkbox value.

For a complete working example see our [sample page](https://cdn.rawgit.com/mnn/fluffy-checkbox/master/demo/index.html).


Compilation
-----------
You don't need to compile it yourself, ready files are located at the `dist` directory.
Compilation is done via [Gulp](http://www.gulpjs.com).
```
gulp all
```

License
-------
MIT
