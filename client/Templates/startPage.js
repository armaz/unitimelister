Template.startPage.helpers({
    'toDayUrl' : function(){
        return getDaysUrl(moment());
    },
    'activitiesUrl' :function(){
        return Router.routes['activitiesView'].path();
    }


});


Template.startPage.events({
    'click #goToToday':function(e){
        //window.location.href=getDaysUrl(moment());
        Router.go('dayView',{_dnr:moment().day(),_wnr:moment().week(),_ynr:moment().year()})
    },
    'click #goToActivities':function(e){
        //window.location.href=Router.routes['activitiesView'].path();
        Router.go('activitiesView')
    }


});