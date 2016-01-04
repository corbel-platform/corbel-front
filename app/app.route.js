(function() {
  'use strict';

  angular
    .module('app')
    .config(appConfig)
    .run(appRun);


  /* @ngInject */
  function appConfig($stateProvider, $urlRouterProvider, CONFIG) {

    var base = 'modules/';

    // @todo: controllerAs issue: https://github.com/driftyco/ionic/issues/3058
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: base + 'login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm',
      data: {
        requireLogin: false
      }
    })

    .state('default', {
      abstract: true,
      templateUrl: base + 'layout/layout.html'
    })
    .state('account', {
      url: '/account',
      parent: 'default',
      templateUrl: base + 'account/account.html',
      controller: 'AccountCtrl',
      controllerAs: 'vm',
      data: {
        requireLogin: true
      }
    })

    // Example user page
    .state('domains', {
      url: '/domains',
      parent: 'default',
      templateUrl: base + 'domains/domains.html',
      controller: 'DomainsCtrl',
      controllerAs: 'vm',
      data: {
        requireLogin: true
      }
    });

    $urlRouterProvider.otherwise(function($injector) {
      var usersService = $injector.get('usersService');
      return usersService.isLoggedSync() ? '/domains' : '/login';
    });

  }

  /* @ngInject */
  function appRun($rootScope, $state, usersService) {

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      toState.data = toState.data || {};
      var requireLogin = toState.data.requireLogin;

      if (requireLogin && !usersService.isLoggedSync()) {
        event.preventDefault();
        return $state.go('login');
      }
    });
  }

})();
