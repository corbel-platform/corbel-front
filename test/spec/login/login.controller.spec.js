'use strict';

describe('In app.login', function() {
  describe('In login.controller', function() {

    var LoginCtrl, scope;

    beforeEach(module('app'));
    beforeEach(module('app.const'));
    beforeEach(module('app.config'));
    beforeEach(module('app.login'));

    beforeEach(module('angular-corbel', function(corbelDriverProvider) {
      corbelDriverProvider.setConfig({
        urlBase: 'http://example.org/{{module}}',
        clientSecret: 'clientSecret',
        clientId: 'clientId',
        scopes: 'scopes'
      });
    }));

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope
      });
    }));

    it('has all expected methods', function() {

      expect(LoginCtrl.login).toBeDefined();

    });

  });
});
