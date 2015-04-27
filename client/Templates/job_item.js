
var getCurrentDay=function(dayViewEl){
    var dayId=$(dayViewEl).data("dayid");
    console.log("dayid : "+dayId);
    var tmpdag;

    return Days.findOne({_id: dayId});
}

var updateDayJobTimer=function(day,jobName,value){
    var job= _.find(day.projects,function(j){
            return j.name==jobName;
    });
    if (typeof(job)=='undefined'){ //Fant ikke joben definert på dagen fra før av
        console.log("trying to find job:"+jobName);
        job=Activities.findOne({name:jobName});
        job.timer=parseFloat(job.timer)+parseFloat(value); // Incase the activity had default time set
        day.projects.push(job);
    }else{ // Fant den
        var prjob=_.find(day.projects,function(e){return e.name==jobName});
        prjob.timer=parseFloat(prjob.timer)+parseFloat(value);
        delete prjob["_id"];
    }
    Meteor.call('dayUpdate', day, function (error, result) { // display the error to the user and abort
        if (error) return alert(error.reason);

    });

}

var makeNewDay= function (dayViewEl,jobName,value){
    var newDay = {
        day: $(dayViewEl).data("day"),
        week: $(dayViewEl).data("week"),
        year: $(dayViewEl).data("year"),
        projects : []
    };

    job=Activities.findOne({name:jobName});
    job.timer=parseFloat(job.timer)+value; // Incase the activity had default time set
    newDay.projects.push(job);

    Meteor.call('emptyDayInsert', newDay, function (error, result) { // display the error to the user and abort
        if (error) return alert(error.reason);
        console.log("Fikk tilbake ny-dag id="+result._id);
        tmpdag= Days.findOne({_id: result._id});

    });

}

var changeTime=function (e){
    var jobName=$(e.target).closest(".job-item").data("jobname");
    var value=parseFloat($(e.target).data("value"));
    var  dayViewEl=$(e.target).closest("#dayView");
    var currentDay=getCurrentDay( dayViewEl );

    if (typeof currentDay!= 'undefined'){
        console.log("update!");
        updateDayJobTimer(currentDay, jobName, value);
    }else{
        console.log("new!");
        makeNewDay(dayViewEl,  jobName, value);
    }
    createsoundbite("click.ogg","click.mp3").playclip();

}

Template.jobItem.events({
    'click .change-time':function(e){

        changeTime(e);

    },
    'click .jobitem':function(e){

        $(e.target).closest(".job-wrapper").children(".job-control-item").toggle();
    }





});


Template.jobItem.helpers({
    unsaved_class : function(){
        if ((typeof (this.unsaved)!= 'undefined')&&(this.unsaved==true)){
            return "unsaved";
        }else{
            return "saved";
        }
    },
    usedTimes : function(){
            days=Days.find({"projects":{$elemMatch: {name : this.name}}});
            var sumtimer=0
            var jobname=this.name;
            days.forEach(function(item) {
                
                var job=_.find(item.projects, function(job){ return (job.name==jobname);});
                sumtimer+=job.timer;
            });
            return sumtimer;
    },
    budget : function(){
        if ((this.project_nr)&&(this.activity_name)){
            var activities=Session.get("activitylist");
            var act=Activities.findOne({project_nr:this.project_nr,activity_name:this.activity_name});
            if (act){
                return act.budget;
            }
        }
    }
});