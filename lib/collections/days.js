Days = new Mongo.Collection('days');

Meteor.methods({
    emptyDayInsert: function(postAttributes) {
        //check(Meteor.userId(), String);
        /*
        check(postAttributes, {
            day: Number,
            week: Number,
            year: Number
        });*/
/*        var user = Meteor.user();
*/
        var post = _.extend(postAttributes, {
            userId: Meteor.userId()
        });
        var post=postAttributes;
        var dayId = Days.insert(post);
        //console.log("emptyDayInsert:opprettet dag:"+JSON.stringify(post));
        return {
            _id: dayId
        };
    },


    dayUpdate :function(day) {
        //check(Meteor.userId(), String);
        /*
        check(day, {
            day: Number,
            week: Number,
            year: Number
        });*/
        /*        var user = Meteor.user();
*/
         var query = {day:day.day,week:day.week,year:day.year,userId:Meteor.userId()};
        delete day._id;
        console.log("Updating dag : query: "+JSON.stringify(query));

        console.log(JSON.stringify(day));
        //var post=postAttributes;
        Days.update(query,day);

    }
});