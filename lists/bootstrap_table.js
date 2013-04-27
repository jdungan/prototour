function(head, req) {
    
    var Mustache = require("lib/mustache");
    start({headers: {"Content-type": "text/html"}});
    var must_temp='<tr id="{{_id}}" data-rev="{{_rev}}" class="table-record">';
    var header_row='<tr>';

    var row=getRow();
    
    if (row){
        for (var p in row.value){
            if (p.charAt(0)!='_'){
                if (p.charAt(0)==p.charAt(0).toUpperCase()){
                    // all fieldnames with uppercase first char
                    must_temp+='<td class="field_value" name='+p+'>{{'+p+'}}</td>';
                    header_row+='<th class="field_header">'+p+'</th>';
                }
            }
        }
        must_temp  += '</tr>';
        header_row += '<th id="util_col"></th></tr>';//last field for sort and edit buttons    

        send('<table class="table table-striped">');

        send(header_row);

        do {
            send(Mustache.render(must_temp,row.value));            
        } while (row = getRow());

        send('</table>');
                
    }
};
 
