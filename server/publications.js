

Meteor.publish('days', function() {
	console.log("Skal publishe alle days for :"+this.userId);
    return Days.find({userId:this.userId });
});


Meteor.publish('activities', function() {
	console.log("Skal publishe alle Activities for :"+this.userId);
    return Activities.find({userId:this.userId });
});