var daynames = ["mandag","tirsdag","onsdag","torsdag","fredag","lørdag","søndag"];
var monthnames = ["Jan" , "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


//** Usage: Instantiate script by calling: var uniquevar=createsoundbite("soundfile1", "fallbackfile2", "fallebacksound3", etc)
//** Call: uniquevar.playclip() to play sound



/**
 * This function merges two job/projects array removing duplicates based on name
 * and returns the sorted result.
 * @param list1
 * @param list2
 */
sortedMergeJobs = function(list1,list2){
    if (typeof list1=='undefined'){
        list1 = [];
    }
    _.each(list2,function(i2){
        var f=true;
        _.each(list1,function(i1){ //sjekk om allerede finnes i list1
            if (i2.name==i1.name) f=false;
        });
        if (f) list1.push(i2);
    });
    return _.sortBy(list1,function(a){return a.name; });
};


totalDayTimer = function(day){
        var t=0;
        _.each(day.projects,function(e){
            t+= e.timer;
        });
    return t;
};


Template.dayView.helpers({

    dayname: function() {

        var ToDay=this;
        if ((ToDay.day>=0) && (ToDay.day<7)) {
            return daynames[ToDay.day];
        }else{
            return "WHAT, wrong day number"
        }
    },
    datestring: function(){
        var tid=moment().year(this.year).week(this.week).day(this.day);
        return tid.format("w dddd, D  MMMM  YYYY");
    },
    day: function() {
        return this;
    },
    jobs : function() {
        return sortedMergeJobs(this.projects,Session.get("activitylist"));
    },
    nextDayUrl : function(){
        return getDaysUrl(moment().week(this.week).day(this.day+1));
    },
    prevDayUrl : function(){
        return getDaysUrl(moment().week(this.week).day(this.day-1));
    },
    daytotalt : function(){

        return totalDayTimer(this);
    },
    timerclass : function(){

        var lasttime=Session.get("totaltDayTimer");
      var t=totalDayTimer(this);
        if ((lasttime<7.5)&&(t>=7.5)){
            //createsoundbite("/sound/test.mp3").playclip();
            //Session.set("totaltDayTimer",t);
        }
        if (t>=7.5){
            return "nok";
        }else{
            return "ikkenok";
        }
    }
});


Template.dayView.rendered=function(){
    var day=this.data;
    console.log("this day ?"+JSON.stringify(day));
    var t=0;
    _.each(day.projects, function (e) {
        console.log("> "+ e.name)
        t += parseInt(e.timer);
    });
    console.log("Setter totaltDayTimer i rendered (once)=" + t);
    Session.set("totaltDayTimer", t);

    this.autorun(function(){
        var t=0;
        var day=Session.get("currentDay");
        //console.log("Er i autorun " + day);
        if ((day != undefined)&&(day._id != undefined )) {
            var day = Days.findOne({_id: day._id});
            _.each(day.projects, function (e) {
                t += e.timer;
            });

            var lastTime = Session.get("totaltDayTimer");
            if (lastTime!=t) {
                //console.log("Setter totaltDayTimer i autorun =" + t);
                Session.set("totaltDayTimer", t);
            }
            if ((lastTime < 7.5) && (t >= 7.5)) {
                createsoundbite("test.mp3").playclip();
            }
        }
    });
};


Template.dayView.events({
    'click #new-activity-btn': function (e) {
        $("input#new-activity").show(500).focus();
        $(e.target).hide().parent().prepend("<button id='new-activity-submit' class='btn btn-default'>Legg den til</button>");

    },
    'change input#new-activity' :function(e){
        var activity_name=e.target.value;
        var activity=Activities.findOne({name:activity_name});
        if (activity){
            $(e.target).hide().parent().append("<span id='activity-excist-message'>En aktivitet med samme navn finnes fra før ....</span>");
            setTimeout(function(){
                $("#activity-excist-message").hide(500).remove();
            }, 2000);

        }else{
            Meteor.call('addActivity',{name:e.target.value,timer:0});
            $(e.target).hide(500).val("");

        }
        $("#new-activity-btn").show();
        $("#new-activity-submit").remove();


    },
    'click #prevnext .btn' : function(){
        createsoundbite("whistle.mp3","whistle.ogg").playclip();
    },
    'click #A' : function(){
        //$("div#dayView").data("transition-out","scaleIn");
        Template.instance().$("div#dayView").attr("transOut","scaleOut");
        var day=Session.get("currentDay");
        console.log($("div#dayView").data("transition-out"));
        Router.go('weekView',{_ynr:day.year,_wnr:day.week});
    },'click #B' : function(){
        var media = new Media("/android_asset/www/application/sound/whistle.mp3", mediaSuccess, mediaError);
        media.play();
    },'click #C' : function(){
        var media = new Media("/sound/whistle.mp3", mediaSuccess, mediaError);
        media.play();
    },'click #D' : function(){
        var media = new Media("http://meteor.local/sound/whistle.mp3", mediaSuccess, mediaError);
        media.play();
    }
});

calculateAnimationDuration = function(node){
    animationDuration = UI._globalHelpers['s2ms']($(node).css('animation-duration'));
    animationDelay = UI._globalHelpers['s2ms']($(node).css('animation-delay'));
    animationDuration = animationDuration + animationDelay;
    return animationDuration;
}


Template.dayView.gestures({
    'swipeleft #dayView' : function(){


        createsoundbite("whistle.mp3","whistle.ogg").playclip();
        pageTransition("#dayView","slideLeftOut","fadeIn");
        var t=moment().year(this.year).week(this.week).day(this.day+1);
        Router.go('dayView',{_dnr:t.day(),_wnr:t.week(),_ynr:t.year()});

    },
    'swiperight #dayView' : function(){
        createsoundbite("whistle.mp3","whistle.ogg").playclip();
        pageTransition("#dayView","slideRightOut","fadeIn");
        var t=moment().year(this.year).week(this.week).day(this.day-1);
        Router.go('dayView',{_dnr:t.day(),_wnr:t.week(),_ynr:t.year()});
    },
    'pinchin #dayView' : function(){
        Template.instance().$("div#dayView").attr("transOut","scaleOut");
        var day=Session.get("currentDay");
        Router.go('weekView',{_ynr:day.year,_wnr:day.week});
    }



});

