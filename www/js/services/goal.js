angular.module('app.services')

// Factories allows us to define objects within our app. We can expose
// specific methods within the object literal to mimic API calls, e.g.
// Goal.get() returns all goals.
.factory("Goal", ["Patient", "$firebaseArray", "$firebaseObject", function(Patient, $firebaseArray, $firebaseObject) {
  // TODO create enums for personal vs clinical

  return {
    get: function() {
      var ref = this.ref();
      return $firebaseArray(ref)
    },
    ref: function() {
      var uid = Patient.uid();
      return Patient.ref(uid).child("goals")
    },
    getGoal: function(goal_id) {
      var ref = this.ref().child(goal_id);
      return $firebaseObject(ref);
    },
    add: function(goal) {
      // Replace with Firebase
      var g = {
        body: goal.body,
        type: goal.type
      }

      var goals = this.get();
      var req = goals.$add(g);

      return g;
    }
  };
}])
