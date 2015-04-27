Template.navbar.helpers({


   'navActiveClass' : function(name){
       //console.log("Vi er her nå "+name+" , "+Router.current().lookupOption("name"));
       if (name==Router.current().lookupOption("name")){
           return {class:"active"}
       }else{
           return;
       }
   },

    'dayViewUrl' : function(){
        $("#bs-navbar-collapse-1").removeClass("in");
        return getDaysUrl(moment());
    },
    'weekViewUrl' : function(){
        $("#bs-navbar-collapse-1").removeClass("in");
       return Router.routes["weekView"].path({_ynr:moment().year(),_wnr:moment().week()});
        
    },
    'activitiesViewUrl' : function(){
        $("#bs-navbar-collapse-1").removeClass("in");
        return Router.routes["activitiesView"].path();
    }


});