(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name  app.layout:AppHeaderCtrl
   * @description
   * # AppHeaderCtrl
   * A module to manage layout header
   */
  angular.module('app.layout')
    .controller('AppHeaderCtrl', AppHeaderCtrl);

  /* @ngInject */
  function AppHeaderCtrl($state, cfpLoadingBar, usersService) {

    var vm = this;

    vm.logout = logout;

    return vm;

    function _logoutCallback() {
      cfpLoadingBar.complete();
      return $state.go('home.index');
    }

    function logout() {
      cfpLoadingBar.start();
      return usersService.logout().then(_logoutCallback).catch(_logoutCallback);
    }

  }

})();
