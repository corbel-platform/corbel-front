(function() {
  'use strict';

  /**
   * app.domainsService Module
   *
   * domainsService utils
   */
  angular.module('app').factory('domainsService', domainsService);

  /* @ngInject */
  function domainsService(corbelDriver) {

    var services = {
      create: create,
      get: get,
      getById: getById
    };

    return services;

    function create(params) {
      return corbelDriver.iam.domain().create(params);
    }

    function get(params) {
      params = params || {};
      params.pagination = params.pagination || {};
      params.pagination.page = params.pagination.page || 0;
      params.pagination.pageSize = params.pagination.pageSize || 10;

      return corbelDriver.iam.domain().getAll(params).then(function(response) {
        return response.data;
      });
    }

    function getById(id) {
      return corbelDriver.iam.domain(id).get();
    }

  }

})();
