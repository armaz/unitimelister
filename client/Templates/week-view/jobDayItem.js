


/*
Template.jobDayItem.helpers({
	'time' : function (job,daynr){
		console.log("job="+job+" this="+daynr);
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
	},

});
*/