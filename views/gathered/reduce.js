function (keys, values, rereduce) {
    var totalbad=0,totalgood=0;
    for (var i in values) {
        totalbad += (+values[i].Bad);
	    totalgood += (+values[i].Good);
    }
	return {"Good":totalgood,"Bad":totalbad}
};


