(function() {

  /**
   * app.layout Module
   *
   * main-sidebar directive
   */
  angular.module('app.layout').directive('mainSidebar', MainSidebar);

  function MainSidebar() {

    var directive = {
      templateUrl: '/modules/layout/components/main-sidebar.html',
      restrict: 'E',
      scope: {},
      controller: 'MainSidebarCtrl',
      controllerAs: 'vm',
      bindToController: true

    };
    return directive;

  }

})();
