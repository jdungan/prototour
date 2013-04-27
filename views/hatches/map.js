function(doc) {
    if (doc.recType) {
        if (doc.recType == "Hatch") {
            if (doc.Name){
                emit(doc.Date,doc);
            }
        }
    }
};


