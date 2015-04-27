Activities = new Mongo.Collection('activities');


Meteor.methods({
    addActivity: function (atts) {
        //check(Meteor.userId(), String);
        /*
         check(postAttributes, {
         day: Number,
         week: Number,
         year: Number
         });*/
        /*        var user = Meteor.user();
         */
        var post = _.extend(atts, {
            userId: Meteor.userId()
        });

        var activityId = Activities.insert(post);
        console.log("La til en ny Activity for " + Meteor.user().username);
        return {
            _id: activityId
        };
    },


    updateActivity: function (activity) {
        console.log("Fikk inn activity to update"+JSON.stringify(activity));
        var id=activity._id;
        delete activity._id;
        //check(Meteor.userId(), String);
        /*
         check(day, {
         day: Number,
         week: Number,
         year: Number
         });*/
        /*        var user = Meteor.user();
         */
        var post = _.extend(activity, {
            userId: Meteor.userId()
        });

        //var post=postAttributes;
        Activities.update({_id: id}, {$set:activity});

    },

    removeActivity: function (activity) {


        var post = _.extend(activity, {
            userId: Meteor.userId()
        });
        Activities.remove(post);
    }

});