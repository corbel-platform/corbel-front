(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name  app.layout:MainSidebarCtrl
   * @description
   * # MainSidebarCtrl
   * A module to manage layout header
   */
  angular.module('app.layout')
    .controller('MainSidebarCtrl', MainSidebarCtrl);

  /* @ngInject */
  function MainSidebarCtrl($rootScope, $scope, $state, $localStorage, cfpLoadingBar, usersService) {

    var vm = this;

    vm.firstName = '';
    vm.domain = $rootScope.domain || '<Select a domain>';

    vm.isActive = isActive;

    _init();

    return vm;

    function _init() {
      _addEventListeners();
      return _loadMe().then(function() {
        $scope.$digest();
      });
    }

    function _addEventListeners() {
      $rootScope.$on('user:change', function(event, newUser) {
        vm.firstName = newUser.firstName;
      });
    }

    function _loadMe() {
      return usersService.getMe().then(function(user) {
        vm.firstName = user.firstName;
      });
    }

    /**
     * Returns whenever a url is active in base current state value
     * @todo: replace with String.prototype.startsWith method or ui-sref-active
     * @param  {string}  state
     * @return {boolean}
     */
    function isActive(state) {
      state = '/' + state;
      return $state.$current.url.source.slice(0, state.length) === state;
    }

  }

})();
