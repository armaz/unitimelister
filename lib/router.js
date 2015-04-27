Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        console.log("Waiton er kjørt");

        return  [Meteor.subscribe('activities'),Meteor.subscribe('days')];
    }
});

if (Meteor.isClient) {
    // Keep showing the launch screen on mobile devices until we have loaded
    // the app's data
    // Dette er ikke i bruk
    dataReadyHold = LaunchScreen.hold();


}


Router.route('/', {name: 'startPage'});


Router.route('/y/:_ynr/w/:_wnr', {
    name: 'weekView',
    data: function() {

        var wnr=parseInt(this.params._wnr);
        var ynr=parseInt(this.params._ynr);


        var week = {
                    week: wnr,
                    year: ynr//,
                };
        Session.set("currentWeek",week);
        return week;
    }
});




Router.route('/w/:_wnr/d/:_dnr', {
    name : "shortDayView",
    onBeforeAction: function () {
        console.log("Fuck, we are here.....");
        Router.go("dayView",{_ynr:moment().year(),_wnr:this.params._wnr,_dnr:this.params._dnr});
    }
});

Router.route('/y/:_ynr/w/:_wnr/d/:_dnr', {
    name: 'dayView',
    data: function() {

        var dnr=parseInt(this.params._dnr);
        var wnr=parseInt(this.params._wnr);
        var ynr=parseInt(this.params._ynr);
        console.log("urlparams >> "+wnr+" -- "+dnr);

        var day = Days.findOne({"year":ynr,"week":wnr,"day":dnr});
        if (typeof day == 'undefined'){
            var tid=moment().week(wnr).day(dnr).year(ynr);
            if (tid.isValid()){
                day = {
                    week: tid.week(),
                    day: tid.day(),
                    year: tid.year()//,
                    //projects : Activities.find()
                };
            }else{
                day = {
                    week: moment().week(),
                    day: moment().day(),
                    year: moment().year()//,
                    //projects : Activities.find()
                };
            }
        }else{

        }
        Session.set("currentDay",day);        
        return day;
    }
});



Router.route('/activities', {
    name: 'activitiesView'
});

Router.route('/m/activities', {
    name: 'mobileActivitiesView'
});


Router.onBeforeAction(function(pause) {
    if (!(Meteor.loggingIn() || Meteor.user())) {
        console.log("");
        //Notify.setError(__('Please login.')); // some custom packages
        this.render('startPage');
        pause();
    }else{
        this.next();
    }

});
