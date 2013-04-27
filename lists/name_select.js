function(head, req) {
    
    var Mustache = require("lib/mustache");
    start({headers: {"Content-type": "text/html"}});
        
    var row=getRow();
    
    if(row){
        select_type=row.value.recType
        unique=[];
        names=[];
        do {
            rowName=row.value.Name;
            if (unique.indexOf(rowName)==-1){
                unique.push(rowName);
                names.push({"Name":rowName});
            }
        } while (row = getRow());
    }
    
    name_list={"names":names};
    ms_template='{{#names}}<option value="{{Name}}">{{Name}}</option>{{/names}}';
    send(Mustache.render(ms_template,name_list));

}
