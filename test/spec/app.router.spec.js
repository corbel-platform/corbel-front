'use strict';

describe('Path', function() {

  var $rootScope, $state, $location, $templateCache, $injector, $localStorage, $sessionStorage;

  beforeEach(module('app'));
  beforeEach(module('ngStorage'));

  beforeEach(inject(function(
    _$templateCache_,
    _$location_,
    _$rootScope_,
    _$state_,
    _$injector_,
    _$localStorage_,
    _$sessionStorage_
  ) {

    $templateCache = _$templateCache_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $injector = _$injector_;
    $localStorage = _$localStorage_;
    $sessionStorage = _$sessionStorage_;

  }));

  // Since ui-router will by default try to retrieve your views, we use this tiny function
  // to mock a template for a specific route.
  function mockTemplate(templateRoute, tmpl) {
    $templateCache.put(templateRoute, tmpl || templateRoute);
  }

  // Literally takes you to the specified URL and then does a $digest. Simply to
  // make tests look more readable.
  function goTo(url) {
    $location.url(url);
    $rootScope.$digest();
  }

  // This is used mainly to check onEnter and onExit blocks, as you actually need to do
  // the state transition. We prime the $location so that the ui-router does not immediately
  // go somewhere different on $scope.$digest().
  // function goFrom(url) {
  //   return {
  //     toState: function(state, params) {
  //       $location.replace().url(url); //Don't actually trigger a reload
  //       $state.go(state, params);
  //       $rootScope.$digest();
  //     }
  //   };
  // }

  // Resolve blocks are a bit tricky to test, so this is what I've been using personally.
  // It's a bit weird, but it essentially lets you execute the resolve as if you were
  // ui-router. It uses $injector to get you the fully wired up version of the resolve result.
  // function resolve(value) {
  //   return {
  //     forStateAndView: function(state, view) {
  //       var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
  //       return $injector.invoke(viewDefinition.resolve[value]);
  //     }
  //   };
  // }

  var USER = {
    username: 'username',
    firstName: 'Anthanh',
    lastName: 'Pham Trinh',
    pass: 'Pham Trinh',
    email: 'test@devialab.com'
  };

  var TOKEN = {
    accessToken: 'token',
    expiresAt: 123123123,
    refreshToken: 'refreshToken'
  };

  beforeEach(function() {

    mockTemplate('modules/login/login.html');
    mockTemplate('modules/layout/layout.html');
    mockTemplate('modules/domains/domains.html');
    mockTemplate('modules/account/account.html');

  });

  xdescribe('When', function() {

    describe('is not loggedin', function() {

      beforeEach(function() {
        $localStorage.$reset();
        $sessionStorage.$reset();
      });

      it(', go to home view for privileged states', function() {
        goTo('');
        expect($state.current.name).toEqual('login');
        goTo('/');
        expect($state.current.name).toEqual('login');
        goTo('/login');
        expect($state.current.name).toEqual('login');
        goTo('/domains');
        expect($state.current.name).toEqual('login');
        goTo('/account');
        expect($state.current.name).toEqual('login');
      });

    });

    describe('is loggedin', function() {

      beforeEach(function() {
        $sessionStorage.user = USER;
        $sessionStorage.token = TOKEN;
      });

      it(', go to specific view', function() {
        goTo('');
        expect($state.current.name).toEqual('login');
        goTo('/');
        expect($state.current.name).toEqual('login');
        goTo('/login');
        expect($state.current.name).toEqual('login');
        goTo('/domains');
        expect($state.current.name).toEqual('domains');
        goTo('/account');
        expect($state.current.name).toEqual('account');
      });

    });

  });

});
