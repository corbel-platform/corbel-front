(function() {

  /**
   * app.layout Module
   *
   * app-header directive
   */
  angular.module('app.layout').directive('appHeader', AppHeader);

  function AppHeader() {

    var directive = {
      templateUrl: '/modules/layout/components/header.html',
      restrict: 'E',
      scope: {},
      controller: 'AppHeaderCtrl',
      controllerAs: 'vm',
      bindToController: true

    };
    return directive;

  }

})();
