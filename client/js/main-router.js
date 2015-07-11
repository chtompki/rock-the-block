angular.module('LookieDontTouchie').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('login', {
            url: '/',
            templateUrl: 'templates/login-page.html',
            controller: 'LoginController'
    });
    // $stateProvider.state('lemonaide', {
    //         url: '/lemonaide',
    //         templateUrl: 'templates/lemon-aide.html',
    //         controller: 'LemonAideController'
    // });
    // $stateProvider.state('orderInfo', {
    //     url: '/orderInfo',
    //     templateUrl: 'templates/order-info.html',
    //     controller: 'OrderInfoController'
    // });

    // $stateProvider.state('orderInfoCards', {
    //     url: '/orderInfoCards',
    //     templateUrl: 'templates/order-info-cards.html',
    //     controller: 'OrderInfoCardsController'
    // });
    // $stateProvider.state('give', {
    //     url: '/give',
    //     templateUrl: 'templates/give.html',
    //     controller: 'GiveController'
    // });
    // $stateProvider.state('give.thankYou', {
    //     url: '/thankYou',
    //     templateUrl: 'templates/thank-you.html',
    //     controller: 'ThankYouController'
    // });
    // $stateProvider.state('lemonaide.lemonade', {
    //     url: '/lemonade',
    //     templateUrl: 'templates/sell-lemonade.html',
    //     controller: 'LemonadeController'
    // });
    // $stateProvider.state('lemonaide.healthySnacks', {
    //     url: '/healthySnacks',
    //     templateUrl: 'templates/sell-healthy-snacks.html',
    //     controller: 'HealthySnacksController'
    // });
    // $stateProvider.state('lemonaide.treats', {
    //     url: '/treats',
    //     templateUrl: 'templates/sell-treats.html',
    //     controller: 'TreatsController'
    // });
}]);