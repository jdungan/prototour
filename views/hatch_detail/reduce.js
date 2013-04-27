function (keys, values, rereduce) {
    var totalcount=0;
    for (var i in values){
        totalcount += values[i];
    }
	return {"Count":totalcount};
};


