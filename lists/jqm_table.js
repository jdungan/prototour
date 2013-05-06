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
                    header_row+='<th class="field_header">'+p+'</th>';
                    must_temp+='<td class="field_value" name='+p+'>{{'+p+'}}</td>';
                }
            }
        }
        
        header_row += '<th id="util_col"></th></tr>';//last field for delete button   
        
        var delText='<i class="icon-remove-circle row-delete icon-2x"></i>';
        must_temp  += '<td>'+delText+'</td></tr>';
        
        send("<table data-role='table' data-mode='reflow' class='ui-responsive table-stroke ui-table'>");
        
        send("<thead>"+header_row+"</thead>");
        send("<tbody>");
        do {
            send(Mustache.render(must_temp,row.value));            
        } while (row = getRow());

        send('</tbody></table>');
                
    }
};

 
