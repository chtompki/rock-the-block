angular.module('LookieDontTouchie', ['ui.router']);

angular.module('LookieDontTouchie').config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);