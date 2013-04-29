
jQuery(document).ready(function() {
    var currentLat,currentLng;
    
    var path = unescape(document.location.pathname).split('/'),        
        design   = "tour",                    ///path[3],
        db   = $.couch.db("tour");             
         //$.couch.db(path[1]);  //$.couch.db(document.location.hostname);  

    function refreshPage() {
        $.mobile.changePage(window.location.href, {
            allowSamePageTransition: true,
            transition: 'none',
            showLoadMsg: false,
            reloadPage: true
        });
    }
    
     $('#saveLocation').click(function (event) { 
         event.preventDefault();
         $('#newLocation').submit();
         $.mobile.changePage("#locationPage");
     });

     // make it a couchform
     $('#newLocation').couchForm({
         beforeSave : function(doc) {
             doc.lat=currentLat;
             doc.lng=currentLng;
             doc.created_at = new Date();
             return doc;
         }
     });
                     
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

    var locationsLoaded = function (this_hash,data){
        $(this_hash.destination).html(data);
        $('i.row-delete').unbind('click');
        $('i.row-delete').click(function (event) { 
            event.preventDefault();
            var thisDOC = $(this).closest('tr');
            db.removeDoc({   _id: thisDOC.attr('id'),
                            _rev: thisDOC.data('rev')})
            }
        );
    };

    var hash_router = {
        "locations": {
            "title": "Saved Locations",
            "list": "jqm_table",
            "view": "locations",
            "destination": "#locationTable",
            "load_function":locationsLoaded,
            "ajax_data":{ descending : false ,reduce:false}
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
                  current_click_script=hash;
                  
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
      currentLat=crd.latitude;
      currentLng=crd.longitude;
      
      posHTML="Lat: "+currentLat+"</br>Lng: "+currentLng;
      
      $("#currentPos").html(posHTML);
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
    };

    id = navigator.geolocation.watchPosition(goodPositionChange, badPositionChange, options);
 
$("#locationPage").on("pageshow",function(){
    load_hash('locations');  
});

 
    
});

