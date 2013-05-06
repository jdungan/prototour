function(head, req) {
    
    var Mustache = require("lib/mustache");
    start({headers: {"Content-type": "text/html"}});
    var row=getRow();
    send('[');
    if (row){        
        do {
            send('{"name":"'+row.value.Name+'",\
                   "lat": "'+row.value.lat +'",\
                   "lng": "'+row.value.lng +'"\
            },');
        } while (row = getRow());

    }
    send("{}]")

};

 
