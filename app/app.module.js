(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name app
   * @description
   * # Application
   *
   * Main module of the application.
   */
  angular.module('app', [
    'app.core',

    //features
    'app.account',
    'app.domains',
    'app.layout',
    'app.login',
    'app.session-transfer',
    'app.ui',
    'app.utils'

  ]).config(configure).run(init);

  /* @ngInject */
  function configure($logProvider, corbelDriverProvider, configProvider) {

    /**
     * LOG DEBUG
     */
    $logProvider.debugEnabled(configProvider.get('debug'));

    /**
     * ANGULAR-CORBEL
     */
    corbelDriverProvider.setConfig({
      urlBase: configProvider.get('corbel.urlBase'),
      clientId: configProvider.get('corbel.clientId'),
      clientSecret: configProvider.get('corbel.clientSecret'),
      domain: configProvider.get('corbel.domain'),
      iamEndpoint: configProvider.get('iamEndpoint'),
      scopes: configProvider.get('corbel.scopes'),
      iamScopes: configProvider.get('corbel.userScopes'),
      audience: configProvider.get('corbel.audience')
    });

  }

  /* @ngInject */
  function init($log, $state, corbelDriver, config, usersService) {

    /**
     * CORBEL
     */
    corbelDriver.on('token:refresh', function(token) {
      $log.debug('app.module:token:refresh');
      usersService.setToken(token);
    });

    corbelDriver.on('service:request:after', function(response) {
      if (response.status === 401) {
        $state.go('login');
      }
    });

    usersService.isLogged().catch(function() {
      return corbelDriver.iam.token().create();
    });

    /**
     * IE SVG HACK
     */
    svg4everybody();

    /**
     * GOOGLE ANALYTICS
     */
    /* jshint ignore:start */
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', config.get('googleAnalyticsCode'), 'auto');
    /* jshint ignore:end */

  }

})();
