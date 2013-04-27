function(head, req) {

    start({headers: {"Content-type": "text/html"}});
    
    var Mustache = require("lib/mustache"),
    header_row='<tr class="summary_row">',
    key_template='',
    val_template='';
    
    
    var row=getRow(); //get the first row

    if (row){
        // add columns for the keys
        if (row.key){
            for (var k in row.key) {
                for (var o in row.key[k]){
                    header_row += '<th class="summary_col" data-group-levels='+row.key.length+'>'+o+'</th>';
                    key_template  += '<td class="key_name" name='+o+'>{{'+o+'}}</td>';
                }
            }
        }
        
        // add columns for the values
        for (var p in row.value) {
            if (p.charAt(0)!='_'){
                if (p.charAt(0) === p.charAt(0).toUpperCase()){
                    // all fieldnames with uppercase first char
                    header_row += '<th class="field_header">'+p+'</th>';
                    val_template  += '<td class="field_value" name='+p+'>{{'+p+'}}</td>';
                }
            }
        }
        //close the rows
        header_row    += '</tr>';

        send('<div class="well well-small">')
        send('<table class="table table-striped summary">');
        send(header_row);

        do {
            send('<tr>')
            var key_values={};            
            if (row.key){
                row.key.forEach(function(val, idx, array){
                    Object.getOwnPropertyNames(val).forEach(function(prop, idx, array) {
                        key_values[prop]=val[prop];
                    });                    
                });                
                send(Mustache.render(key_template,key_values));            
            }
            send(Mustache.render(val_template,row.value));
            send('</tr>')            
        } while (row = getRow());

        send('</table></div>');
            
    }//end if (row)
};
 
