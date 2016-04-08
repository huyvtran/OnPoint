angular.module('app.services')

.factory('Medication',function() {
  medications = [
    {id: 1, name: "furomeside", trade_name: "Lasix", instructions: "Take twice daily; First in morning and then 6-8 hours later", purpose: "Treats salt and fluid retention and swelling caused by heart failure."},
    {id: 2, name: "metoprolol", trade_name: "Toprol XL", instructions: "TODO: Add instructions here", purpose: "Used to treat chest pain (angina), heart failure, and high blood pressure."},
    {id: 3, name: "lisinopril", trade_name: "Zestril", instructions: "TODO: Add instructions here", purpose: "Zestril is used to treat high blood pressure (hypertension) or congestive heart failure."},
    {id: 4, name: "warfarin", trade_name: "Coumadin", instructions: "Take orally once a day in the morning", purpose: "Treats and prevents blood clots by acting as a blood thinner."},
    {id: 5, name: "losartan", trade_name: "Cozaar", instructions: "TODO: Add instructions here", purpose: "It can treat high blood pressure."},
    {id: 6, name: "metformin", trade_name: "Riomet", instructions: "Take orally, twice daily, with meals", purpose: "Used to treat Type 2 Diabetes."},
    {id: 7, name: "statin", trade_name: "Lipitor", instructions: "TODO: Add instructions here", purpose: "It can treat high cholesterol and triglyceride levels."}
  ]
  input_medications = [];

  return {
    get: function() {
      return medications;
    },
    get_inputList: function() {
      return input_medications;
    },
    get_all_med_trade_name: function(){
      meds = [];
      for(var i = 0; i < medications.length; i++){
        meds.push(medications[i].trade_name);
      }
      return meds;
    },
    get_name_by_trade_name: function(tradeName){
      var name;
      for(var i = 0; i < medications.length; i++){
        if(tradeName == medications[i].trade_name){
          name = medications[i].name;
        }
      }
      return name;
    },
    getByName: function(name) {
      for (var i = 0; i < medications.length; i++) {
        if (medications[i].name == name)
          return medications[i]
      }
    },
    add_inputMed: function(newMed) {
      m = {};
      m.id = input_medications.length + 1;
      m.name = newMed.name;
      m.dosage = newMed.dosage;
      m.timing = newMed.timing;
      m.instructions = newMed.instructions;
      m.purpose = newMed.purpose;
      m.notes = newMed.notes;
      input_medications.push(m);
    },
    getByTradeName: function(trade_name) {
      for (var i = 0; i < medications.length; i++) {
        if (medications[i].trade_name == trade_name)
          return medications[i]
      }
    }
  };
})

// This factory is responsible for defining a Medication Schedule
// that the patient usually adheres to.
.factory('MedicationSchedule', ["Medication", "Patient","$firebaseObject", "$firebaseArray", "CARD", "Card", function(Medication, Patient, $firebaseObject,$firebaseArray, CARD, Card) {
  return {
    ref: function() {
      var uid = Patient.uid();
      return Patient.ref(uid).child("medicationSchedule")
    },

    /*
     * queries firebase data and returns the defaultSchedule from firebase
     * returns a $firebaseArray, this IS NOT A PROMISE. CANNOT CALL THE THEN METHOD ON this
     * use this to display the schedule on the view layer.
     */
    get: function() {
      var ref = this.ref().child("defaultSchedule");
      return $firebaseArray(ref);
    },

    /*
     * queries firebase data and returns the defaultSchedule from firebase
     * this method will return a PROMISE, so we can call the then method on the promise
     * and update other $scope variables once the promise has been fulfilled.
     * use this when we need to use the schedule to create other things, i.e. generateCardsForToday()
     */
    getAsPromise: function() {
      var ref = this.ref().child("defaultSchedule").once("value");
      return ref;
    },

    /*
     * querues firebase returns a specific scheduleId within this patients
     * firebase defaultSchedule
     * returns a $firebaseObject, THIS IS NOT A PROMISE. TREAT IT LIKE A REAL OBJECT
     * use this to display the specific schedule on an html page.
     */
    findByID: function(id) {
      var ref = this.ref().child("defaultSchedule").child(id)
      return $firebaseObject(ref);
    },

    // Add a time slot to the schedule
    addTimeSlot: function(slotName, daysArray){
      var ref = this.get();
      var instanceFB =  { //use this if adding new element
        time: "00:00",
        slot: slotName,
        days: daysArray,
      };
      ref.$add(instanceFB);
    },

    createTodaysCards: function() {
      var today = (new Date()).toISOString().substring(0,10)

      var that = this;

      var todaysCardsReq = Card.ref().child(today).child(CARD.CATEGORY.MEDICATIONS_SCHEDULE).once("value", function (snap) {
        if (!snap.exists()) {
          var req = that.ref().child("defaultSchedule").once("value", function(snap) {
            var schedule = snap.val();
            var now    = (new Date()).toISOString();
            var date = now.substring(0,10) //Only get the date: YYYY-MM-DD
            for(var i = 0; i < schedule.length; i++) {
              var show = new Date()
              show.setHours(parseInt(schedule[i].time.substring(0,2)));
              show.setMinutes(parseInt(schedule[i].time.substring(3,5)));
              var card = {type: CARD.TYPE.ACTION,
                                created_at: now,
                                updated_at: now,
                                completed_at: null,
                                archived_at: null,
                                shown_at: show.toISOString()
                              }
              var object = {type: CARD.CATEGORY.MEDICATIONS_SCHEDULE,
                            id: schedule[i].id}
              Card.createCard(date, object, card);

            } //end for
          }) //end req
        }
      }) //end todaysCardReq
    }

  };
}])

.factory('MedicationDosage', ["Medication", function() {
  morning   = ["Lasix", "Toprol XL", "Zestril", "Coumadin", "Riomet"]
  afternoon = ["Lasix", "Toprol XL", "Zestril", "Losartan", "Riomet"]
  evening   = ["Lipitor"]

  dosage = {
    furomeside: {
      dose: 40,
      tablets: 1,
      required: false
    },
    metformin: {
      dose: 500,
      tablets: 2,
      required: true
    },
    lisinopril: {
      dose: 40,
      tablets: 3,
      required: false
    },
    warfarin: {
      dose: 500,
      tablets: 4,
      required: true
    },
    losartan: {
      dose: 40,
      tablets: 5,
      required: false
    },
    metoprolol: {
      dose: 40,
      tablets: 6,
      required: false
    },
    statin: {
      dose: 40,
      tablets: 7,
      required: false
    },
  }

  return {
    getByName: function(name) {
      for (var med_name in dosage) {
        if (med_name == name)
          return dosage[med_name]
      }
    }
  };
}])

.factory('MedicationHistory', ["Patient", "$firebaseArray", function(Patient, $firebaseArray) {
  var count = 1;
  var history = [{
      id: 0,
      medication_id: 1,
      medication_schedule_id: 1,
      taken_at: "2016-03-15T08:01:00",
      skipped_at: null
    }, {
      id: 1,
      medication_id: 7,
      medication_schedule_id: 3,
      taken_at: null,
      skipped_at: "2016-03-21T19:00:00"
    }
  ]

  return {
    get: function() {
      return history;
    },
    getTodaysHistory: function() {
      var today = ((new Date()).toISOString()).substring(0,10) //Only get the date: YYYY-MM-DD
      var ref = this.ref().child(today);
      return $firebaseArray(ref);
    },
    ref: function() {
      return Patient.ref().child("medication_histories");
    },
    create_or_update: function(medication, schedule, choice) {
      // TODO: Refactor this to use AngularFire methods to create only if element
      // does not exist.
      var today = ((new Date()).toISOString()).substring(0,10)
      var ref = this.ref().child(today);
      var time_now = (new Date()).toTimeString();

      var updateObject; //use this if updating an element. see https://www.firebase.com/docs/web/api/firebase/update.html
      var instanceFB =  { //use this if adding new element
          medication_id: medication.id,
          medication_schedule_id: schedule.id,
      };

      if (choice == "take") {
        instanceFB.taken_at = time_now;
        updateObject = {'taken_at':time_now};
      }
      else if (choice == "skip") {
        instanceFB.skipped_at = time_now;
        updateObject ={'skipped_at':time_now};
      }

      //Add to or update firebase
      var req = ref.once('value', function(snapshot) {
        if(snapshot.exists()) { //this date child exists
          var updated = false;
          snapshot.forEach(function(data) { //find it
            var hist = data.val();
            if (hist.medication_schedule_id ==  schedule.id && hist.medication_id == medication.id) {
              //found it, need to update it!
              updated = true;
              var medRef = data.ref();
              medRef.update(updateObject);
            }
          });
          if(!updated) {
              //need to push a new one.
              var medRef = snapshot.ref();
              medRef.push(instanceFB);
          }
        } else { //this date child does not exist, push it!
          var medRef = snapshot.ref();
          medRef.push(instanceFB);
        }
      })
      return req;
    },

    findByMedicationIdAndScheduleId: function(med_id, schedule_id) {
      var match;
      for(var i = 0; i < history.length; i++) {
        if (history[i].medication_id == med_id && history[i].medication_schedule_id == schedule_id) {
          match = history[i]
        }
      }
      return match;
    }
  };
}])
