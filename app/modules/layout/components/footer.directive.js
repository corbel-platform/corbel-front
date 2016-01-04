(function() {

  /**
   * app.layout Module
   *
   * appFooter directive
   */
  angular.module('app.layout').directive('appFooter', AppFooter);

  function AppFooter() {

    var directive = {
      templateUrl: '/modules/layout/components/footer.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        $(window).resize();
      }

    };
    return directive;

  }

})();
