(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name  app.login:LoginCtrl
   * @description
   * # LoginCtrl
   * A module to manage login form
   */
  angular.module('app.login')
    .controller('LoginCtrl', LoginCtrl);

  /* @ngInject */
  function LoginCtrl($scope, $state, $translate, cfpLoadingBar, usersService, corbel) {

    var vm = this;

    vm.error = '';

    vm.login = login;

    return vm;

    function login(username, password, persistent) {
      cfpLoadingBar.start();
      vm.error = '';
      return usersService.login(username, password, persistent).then(function() {
        cfpLoadingBar.complete();
        return $state.go('domains');
      }).catch(function() {
        vm.error = 'An error ocurred when login, try it later';
        $scope.$digest();
        cfpLoadingBar.complete();
      });
    }

  }

})();
