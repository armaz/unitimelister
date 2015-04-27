



Template.activitiesView.helpers({
    activities: function () {
        return Activities.find();
    }
});


Template.activitiesView.events({
    'click .name':function(e){

        changeTime(e,1);

    },
    'click #add-activity':function(e){
        var countNew=Activities.find({
            name:/New activity/
        }).count();
        var counter=(countNew==0)?"":countNew+"";
        Meteor.call("addActivity",{
            name:"New activity"+counter,
            timer : 0,
            budget : 0
        });
        var lastel=$(".row.activity",$("#activities-list")).last();
        scrollToElement(lastel,600);
    },
    'click .remove-btn':function(e){
        var id=$(e.target).data("activityid");
        console.log("got id to remove"+id);
        Meteor.call("removeActivity",{
            _id:id
        });

    }
});


Template.activitiesView.rendered=function(){

};


    var editable_defaults = {
        mode: 'inline',
        emptytext: 'Tomt',
        onblur: 'submit',
        showbuttons: false

    }

    function traverse(context, field) {
        var arr = field.split('.');
        while (arr.length && (context = context[arr.shift()]));
        return context;
    }

    function makeAttrs(attrs) {
        attrs = _.extend(_.clone(editable_defaults), attrs);
        var doc = attrs.doc;
        var obj = {
            "data-id": doc._id,
            "data-value": traverse(doc, attrs.field)
        };
        _.each(_.omit(attrs, 'doc'), function(val, name) {
            obj['data-' + name] = val;
        });
        return obj;
    }

    function renderedCallback() {
        var instance = this;
        this.autorun(function() {
            var options;
            options = {
                success: function (response, newValue) {
                    var obj = {};
                    obj[this.dataset.field] = newValue;
                    var collection = traverse(window, this.dataset.collection);
                    //collection.update(this.dataset.id, {
                    //    $set: obj
                    //});
                    console.log("kjor update pa Activities, id=" + this.dataset.id + " ob=" + JSON.stringify(obj));

                    Meteor.call("updateActivity", _.extend(obj, {_id: this.dataset.id}));
                }
            };
            var val = traverse(Blaze.getData().doc, Blaze.getData().field);
            editable=instance.$('.editable').editable('destroy').editable(options).editable('setValue', val);

        });
    }

    Template.editableSpan.rendered = renderedCallback;

    Template.editableSpan.helpers({
        attrs: function() {
            var test1= makeAttrs(this);
            return test1;
        }
    });

    Template.editableDiv.rendered = renderedCallback;

    Template.editableDiv.helpers({
        attrs: function() {
            return makeAttrs(this);
        }
    });


