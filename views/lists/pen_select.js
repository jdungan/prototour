function(head, req) {
    
    var Mustache = require("lib/mustache");
    start({
      headers: {"Content-type": "text/html"}
    });
        
    var row;

    unique_pens=[];
    pen_names=[];
    while (row = getRow()) {
        if (unique_pens.indexOf(row.key.Name)==-1){
            unique_pens.push(row.key.Name);
            pen_names.push({"Name":row.key.Name});
        }
    }

    pen_list={"pens":pen_names};
    ms_template='{{#pens}}<option value="{{Name}}">{{Name}}</option>{{/pens}}';
    
    send(Mustache.render(ms_template,pen_list));
    

}
 