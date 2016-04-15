angular
  .module('whatsapp', [
    'angular-meteor',
    'angular-meteor.auth',
    'angularMoment',
    'ionic'
  ]);

ionic.Platform.ready(function() {
  angular.bootstrap(document, ['whatsapp']);

  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  // for form inputs)
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
    // org.apache.cordova.statusbar required
    StatusBar.styleLightContent();
  }
});