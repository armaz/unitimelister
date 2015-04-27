    Meteor.startup(function () {

        Tracker.autorun(function(){
            Activitylist = [];
            console.log("Er i tracker naa for aa oppdatere ActivityList");
            if (Activities.find().count()>0) {
                Activities.find().forEach(function (i) {
                    delete i["_id"];
                    i.unsaved=true;
                    Activitylist.push(i)
                })
            }
            console.log("Var innom oppdatering av Activitylist "+Activitylist.length);
            Session.set("activitylist",Activitylist);
        });

        Tracker.autorun(function(){

        });

    });
