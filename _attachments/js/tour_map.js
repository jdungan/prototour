// tfdd map 
var tfdd_map= function (element) {    
    // 'tulsa 36.1539,-95.9925'
        
        var map_element = null,
        tulsaLatlng =  tulsaLatlng ||  new google.maps.LatLng(36.1539,-95.9925),
        dispatchMapOptions = {
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center:tulsaLatlng,

            panControl: false,
            scaleControl: false,
            overviewMapControl: false,

            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER,
            },

            mapTypeControl: true,
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM,
            },

            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_CENTER,
            },
        };

    if (element !== map_element){
        map_element = element;
        
        this.map = new google.maps.Map(element, dispatchMapOptions);        
        this.map.dispatch = new dispatch(this.map);
        this.map.hydrants = new hydrant_set(this.map);
    }

    return this.map;
};
