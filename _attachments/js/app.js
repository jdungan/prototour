
jQuery(document).ready(function() {
    
            
    if (manifest){
        if (manifest.templates) {
            $.ajax(manifest.templates)
            .done(function(data){
                for( var pkg in manifest.packages) {
                    var package = manifest.packages[pkg];
                    $(package.destination).html($(data).filter(package.source).text());
                }
            });
        }
    }
    
});

