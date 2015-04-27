


Template.jobDayRow.helpers({

	'time' : function (job,daynr){
		//console.log("job="+job+" this="+daynr);
		var week=Session.get("currentWeek");
		var day=Days.findOne({
			day : daynr,
			week : week.week,
			year : week.year
		});
		if (day){
			var a=_.find(day.projects,function(p){
				return p.name==job
			})
			if (a){
				return a.timer;
			}else{
				return 0;
			}
			
		}else{
			return 0;
		}
	}	

});

Template.jobDayRow.events({
	'click .job-time' : function(e){
		var colnr=$(e.target).index();
		$(".job-day-row div:nth-child("+(colnr+1)+")","div#weekView").css("background-color","red");
		var week=Session.get("currentWeek");

		var trans="scaleOutUp";
		$("#weekView").addClass(trans);
		Meteor.setTimeout(function() {
			Router.go('dayView',{_dnr:colnr,_wnr:week.week,_ynr:week.year})
         },0);
		
		
	}

});
