


Template.weekView.helpers({
	'weeknr' : function (){
		return this.week;
	},

	'yearnr' : function(){
		return this.year;//armazyear
	},

	'jobs' : function(){
		var days=Days.find({week:this.week,year:this.year});
		activities=Session.get("activitylist");
		var jobs=[];
		_.each(activities,function(a){
			jobs.push(a.name);
		});
		days.forEach(function(day){
			_.each(day.projects,function(a){
				jobs.push(a.name);
			});
		});
		console.log("er her");
		res= _.uniq(jobs).sort();
		return res;

	},
	'sum' : function(daynr){
		var day=Days.findOne({year:this.year,week:this.week,day:daynr});
		var sum=0;
		if ((!day) || (!day.projects)){
			return sum;
		}
		_.each(day.projects,function(p){
			sum+=p.timer;
		});
		return sum;
	},
	'date' :function(daynr){
		var week=Session.get("currentWeek");
		var m=moment().year(week.year).week(week.week).day(daynr);
		return m.format("D/M");
	}
});

Template.weekView.gestures({
    'swipeleft #weekView' : function(){
        createsoundbite("whistle.mp3","whistle.ogg").playclip();
        pageTransition("#weekView","slideLeftOut","fadeIn");
        var t=moment().year(this.year).week(this.week+1);
        Router.go('weekView',{_wnr:t.week(),_ynr:t.year()});

    },
    'swiperight #weekView' : function(){
        createsoundbite("whistle.mp3","whistle.ogg").playclip();
        pageTransition("#weekView","slideRightOut","fadeIn");
        var t=moment().year(this.year).week(this.week-1);
        Router.go('weekView',{_wnr:t.week(),_ynr:t.year()});
    }



});
