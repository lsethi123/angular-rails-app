'use strict';
angular.module('notesApp', ['ngResource']).config([
  '$routeProvider',
  function (a) {
    a.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]), angular.module('notesApp').factory('Note', [
  '$resource',
  function (a) {
    return a('/api/notes/:noteId');
  }
]), angular.module('notesApp').controller('MainCtrl', [
  '$scope',
  'Note',
  function (a, b) {
    a.notes = b.query(), a.create = function (c, d) {
      b.save({
        title: c,
        body: d
      }, function (b) {
        a.notes.push(b);
      });
    }, a.delete = function (c) {
      b.delete({ noteId: a.notes[c].id }, function () {
        a.notes.splice(c, 1);
      });
    };
  }
]);