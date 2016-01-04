(function() {

  'use strict';

  angular
    .module('app.domains')
    .controller('DomainsCtrl', DomainsCtrl);

  /* @ngInject */
  function DomainsCtrl(domainsService) {

    var vm = this;

    vm.create = create;

    return vm;

    function create(name, description) {
      domainsService.create({
        name: name,
        description: description
      });
    }

  }

})();
