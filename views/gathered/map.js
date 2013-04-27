 
function(doc) {
    var getWeekNumber= function (d) {
        // Copy date so don't modify original
        d = new Date(d);
        d.setHours(0,0,0);
        // Set to nearest Monday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 1 - (d.getDay()||7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(),0,1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
        // Return array of year and week number
        return [{"Year":d.getFullYear()}, {"Week":weekNo}];
    };

    if (doc.recType) {
        if (doc.recType == "Gathered") {
            if (doc.Date){
                emit(getWeekNumber(doc.Date),doc);
            }
        }
    }
};


// {
//    "_id": "509f3eda419c35f8b0cd57f8ae0dfe91",
//    "_rev": "2-e7dcad85b805b7f33301a93afb87b8c8",
//    "recType": "Gathered",
//    "Date": "03/04/2013",
//    "Pen": "Big House",
//    "Good": "1",
//    "Bad": "1",
//    "Comment": "",
//    "created_at": "2013-03-20T02:51:07.311Z"
// }



