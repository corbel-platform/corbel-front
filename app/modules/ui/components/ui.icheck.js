(function() {

  /**
   * app.icheck Module
   *
   * ui-select directive
   */
  angular.module('app.ui').directive('icheck', Icheck);

  function Icheck() {

    var directive = {
      restrict: 'A',
      link: function(scope, element, attrs) {

        $(element).iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });

      }

    };
    return directive;

  }

})();
