angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('medication_scheduling', {
    url: '/medication_scheduling',
    templateUrl: 'templates/onboarding/menu.html',
    controller: "onboardingCtrl",
    abstract: true
  })
  .state('medication_scheduling.welcome', {
    url: '/welcome',
    views: {
      'onboarding': {
        templateUrl: 'templates/medication_scheduling/welcome.html',
      }
    }
  })
  .state('medication_scheduling.start', {
    url: '/start',
    views: {
      'onboarding': {
        templateUrl: 'templates/medication_scheduling/start.html',
        controller: 'medicationSchedulingCtrl'
      }
    }
  })
  .state('medication_scheduling.new', {
    url: '/new',
    views: {
      'onboarding': {
        templateUrl: 'templates/medication_scheduling/new.html',
        controller: 'newMedicationScheduleSlotCtrl'
      }
    }
  })
  .state('medication_scheduling.edit', {
    url: '/:id/edit',
    views: {
      'onboarding': {
        templateUrl: 'templates/medication_scheduling/edit.html',
        controller: 'editMedicationScheduleSlotCtrl'
      }
    }
  })
  .state('medication_scheduling.fill_pillbox_welcome', {
    url: '/fill_pillbox_welcome',
    views: {
      'onboarding': {
        templateUrl: 'templates/medication_scheduling/fill_pillbox_welcome.html'
      }
    }
  })
  .state('medication_scheduling.fill_pillbox', {
    url: '/fill_pillbox',
    views: {
      'onboarding': {
        templateUrl: 'templates/medication_scheduling/fill_pillbox.html',
        controller: 'pillboxCtrl'
      }
    }
  })
  .state('medication_scheduling.fill_pillbox_complete', {
    url: '/pillbox/complete',
    views: {
      'onboarding': {
        templateUrl: 'templates/pillbox/complete.html',
        controller: 'completePillboxCtrl'
      }
    }
  })
});
