if (Days.find().count() === 0) {

    Days.insert({
        year: 2015,
        week: 1,
        day: 1,
        projects : [
            {
                name : "Agora",
                project_nr : "u0001",
                activity_nr : "0",
                timer: 1
            },
            {
                name : "Mule",
                project_nr : "u0002",
                activity_nr : "0",
                timer: 2
            },
            {
                name : "P360 utrulling",
                project_name : "Sak/arkiv",
                project_nr : "u0003",
                activity_name : "Utrulling",
                activity_nr : "1",
                timer: 3
            },
            {
                name : "P360 forvaltning",
                project_name : "Sak/arkiv",
                project_nr : "u0003",
                activity_name : "Forvaltning",
                activity_nr : "2",
                timer: 2
            }

        ]

    });

    Days.insert({
        year: 2015,
        week: 1,
        day: 2,
        projects : [
            {
                name : "Agora",
                project_nr : "u0001",
                activity_nr : "0",
                timer: 4
            },
            {
                name : "Mule",
                project_nr : "u0002",
                activity_nr : "0",
                timer: 2
            },
            {
                name : "P360 utrulling",
                project_name : "Sak/arkiv",
                project_nr : "u0003",
                activity_name : "Utrulling",
                activity_nr : "1",
                timer: 1
            },
            {
                name : "P360 forvaltning",
                project_name : "Sak/arkiv",
                project_nr : "u0003",
                activity_name : "Forvaltning",
                activity_nr : "2",
                timer: 0
            }

        ]

    });


    Days.insert({
        year: 2015,
        week: 1,
        day: 3,
        projects : [
            {
                name : "Agora",
                project_nr : "u0001",
                activity_nr : "0",
                timer: 3
            },
            {
                name : "Mule",
                project_nr : "u0002",
                activity_nr : "0",
                timer: 2
            },
            {
                name : "P360 utrulling",
                project_name : "Sak/arkiv",
                project_nr : "u0003",
                activity_name : "Utrulling",
                activity_nr : "1",
                timer: 4
            },
            {
                name : "P360 forvaltning",
                project_name : "Sak/arkiv",
                project_nr : "u0003",
                activity_name : "Forvaltning",
                activity_nr : "2",
                timer: 2
            }

        ]

    });
}
if (Activities.find().count()== 0) {
    Activities.insert (
        {
            name : "Agora",
            project_nr : "u0001",
            activity_nr : "0",
            timer: 0,
            editedt: false
        });
    Activities.insert (
        {
            name : "Mule",
            project_nr : "u0002",
            activity_nr : "0",
            timer: 0,
            editedt: false
        });

    Activities.insert (
        {
            name : "P360 utrulling",
            project_name : "Sak/arkiv",
            project_nr : "u0003",
            activity_name : "Utrulling",
            activity_nr : "1",
            timer: 2,
            editedt: false
        });

    Activities.insert (
        {
            name : "P360 forvaltning",
            project_name : "Sak/arkiv",
            project_nr : "u0003",
            activity_name : "Forvaltning",
            activity_nr : "2",
            timer: 0,
            editedt: false
        });


}