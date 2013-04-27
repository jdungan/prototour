
jQuery(document).ready(function() {
    
     $('#saveLocation').click(function (event) { 
         event.preventDefault();
         alert("bingo");
         
         
     });
                 
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
    var path = unescape(document.location.pathname).split('/'),        
        design   = "hatch",                    ///path[3],
        db   = $.couch.db("proto-tour");             
         //$.couch.db(path[1]);  //$.couch.db(document.location.hostname);  
    
    function contentUpdate (){
        if (current_click_script){
            load_hash(current_click_script);                     
        } 
     };
 
    var changesRunning = false;
    function setupChanges(since) {
        if (!changesRunning) {
            var changeHandler = db.changes(since);
            changesRunning = true;
            changeHandler.onChange(contentUpdate);
        }
    }
    
    var hash_router = {
        "gathered": {
            "title": "Egg Production",
            "list": "bootstrap_table",
            "view": "gathered",
            "destination": "#main-content",
            "newrecord_template": "#egg-count",
            "load_function":false,
            "ajax_data":{ descending : false ,reduce:false},
            "side_bar": "gathered_stat"
        }
    };

    var getOptions = function (view,destElement){ 
        if (view){
            $.ajax({
              url: "_list/name_select/"+view,
              data:{ ascending : true}})
              .done(function(data) {
                    $(data,"option").each(function(){
                       $(destElement).append (this);
                    });
                });
        }
    };

    function load_hash(hash){
        var dfd = new $.Deferred();
        var this_hash=hash_router[hash],
        ajax_data=this_hash.ajax_data ||{ descending : true};
        if (this_hash){
            $.ajax({
              url: "_list/"+this_hash.list+"/"+this_hash.view,
              data:ajax_data
              })
            .done( function(data) {
                  setupChanges(data.update_seq);
                  if (this_hash.load_function){
                      this_hash.load_function(this_hash,data);
                  } else{
                      $(this_hash.destination).html(data);              
                  }
                  dfd.resolve();
              }
            );
        }
        return dfd.promise();
    };
    
 
    var id, target, option;


// 
    var goodPositionChange = function(pos) {
      var crd = pos.coords;
      $("#currentLat").text(crd.latitude);
      $("#currentLng").text(crd.longitude);
    };

    var badPositionChange = function (err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    target = {
      latitude : 0,
      longitude: 0,
    }

    options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    id = navigator.geolocation.watchPosition(goodPositionChange, badPositionChange, options);
 
 
 
    
});

