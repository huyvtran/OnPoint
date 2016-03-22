angular.module('app.services', [])

// Factories allows us to define objects within our app. We can expose
// specific methods within the object literal to mimic API calls, e.g.
// Goal.get() returns all goals.
.factory('Goal', function() {

  // TODO create enums for personal vs clinical
  goals = [
    { body: "Remain independent", type: "personal" },
    { body: "Keep visiting with friends and doing my daily activities", type: "personal" },
    { body: "Be able to visit out-of-town family by plane", type: "personal" },
    { body: "Feel healthy", type: "personal" },
    { body: "Control systolic blood pressure to lower than 130/80 mmHg but not less than 90 mmHg.", type: "clinical" },
    { body: "Keep HbA1C levels at 7% or less.", type: "clinical" }
  ];

  return {
    get: function() {
      return goals;
    },
    add: function(goal) {
      goals.push(goal);
    }
  };
})


// Factories allows us to define objects within our app. We can expose
// specific methods within the object literal to mimic API calls, e.g.
// User.get() will return the user associated with this account.
.factory('User', function() {
  return {
    get: function() {
      return {
        id: 1,
        name: "Dmitri"
      }
    }
  };
})

// Factories allows us to define objects within our app. We can expose
// specific methods within the object literal to mimic API calls, e.g.
// Measurement.get() will return all measurements associated with a user.
.factory("Measurement", function() {
  var measurements = [{
    timestamp: "2016-03-01T10:00",
    weight: "160",
    systolic: "120",
    diastolic: "112",
    heartRate: "60"
  }, {
    timestamp: "2016-03-02T10:00",
    weight: "165",
    systolic: "150",
    diastolic: "130",
    heartRate: "75"
  }];

  return {
    get: function() {
      return measurements;
    },

    add: function(date,newWeight,newSystolic,newDiastolic,newHR) {
      console.log(measurements.length);
      measurements.push({timestamp: date,
                         weight: (newWeight),
                         systolic: (newSystolic),
                         diastolic: (newDiastolic),
                         heartRate: (newHR)});
    }
  };

})

.factory('MeasurementTips', function() {
  var measurementTips = [{
    id: 1,
    measurement: "Weight",
    tips: []
  }, {
    id: 2,
    measurement: "Blood Pressure",
    tips: ["Be still.",
           "Make sure you haven't had any caffeine, tobacco, or exercise in the last 30 minutes",
           "Wait one minute before taking another measurement",
           "Make sure you are sitting down, with your back supported by a chair and your feet on the floor"]
  }, {
    id: 3,
    measurement: "Heart Rate",
    tips: []
  }];

  return {
    get: function() {
      return measurementTips;
    }
  };
})

.factory("Appointment", function() {
  var appointments = [{
    id: 1,
    timestamp: "2016-03-05T10:00:00",
    title: "Appointment with cardiologist Dr.Hart",
    location: "2020 Kittredge Str, Berkeley, 94704",
    note: "Please bring your ID",
  }, {
    id: 2,
    timestamp: "2016-03-10T10:00:00",
    title: "Appointment with nurse Denise",
    location: "517 Oxford Str, Oakaland, 06792",
    note: "Please bring your medication history",
  }, {
    id: 3,
    timestamp: "2016-03-15T10:00:00",
    title: "Appointment with Pharmacist Ken",
    location: "7814 Pingyang Str, SanFrancisco, 93501",
    note: "Please don't eat any food before coming",
  }];

  return {
    get: function() {
      return appointments;
    }
  };

})

.factory("Card", function(CARD) {
  var cards = [{
    id: 0,
    created_at: "2016-03-15T10:00:00",
    updated_at: "2016-03-15T10:00:00", //should arrange timeline by this timestamp
    completed_at: null, 
    archived_at: null, 
    type: CARD.TYPE.ACTION,
    object_type: CARD.CATEGORY.MEDICATIONS,
    object_id: 1
  }, {
    id: 1,
    created_at: "2016-03-15T11:00:00",
    updated_at: "2016-03-15T11:00:00", //should arrange timeline by this timestamp
    completed_at: null, 
    archived_at: null, 
    type: CARD.TYPE.ACTION,
    object_type: CARD.CATEGORY.MEASUREMENTS,
    object_id: 1
  }, {
    id: 2,
    created_at: "2016-03-15T11:30:00",
    updated_at: "2016-03-15T11:30:00", //should arrange timeline by this timestamp
    completed_at: null, 
    archived_at: null, 
    type: CARD.TYPE.REMINDER,
    object_type: CARD.CATEGORY.APPOINTMENTS,
    object_id: 1
  }];

  return {
    get: function() {
      return cards;
    }
  };
})
